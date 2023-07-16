<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Users
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/pos/form')">
                        Add User<CIcon
                                    icon="cil-plus" 
                                    size="sm"
                                />
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormSelect v-model="form.line_id">
                    <option value="null">Select Line</option>
                    <option v-for="line in getLinesOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Shift</CInputGroupText>
                <CFormSelect v-model="form.group_id">
                    <option value="null">Select Shift</option>
                    <option v-for="line in getGroupsOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Nama</CInputGroupText>
                <CFormInput v-model="form.fullname"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Nomer HP</CInputGroupText>
                <CFormInput v-model="form.phone_number"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Noreg</CInputGroupText>
                <CFormInput v-model="form.noreg"/>
            </CInputGroup>
            <CInputGroup class="mb-4">
                <CInputGroupText>
                    Password<CIcon icon="cil-lock-locked" />
                </CInputGroupText>
                <CFormInput
                    type="password"
                    v-model="form.password"
                    placeholder="Password"
                />
            </CInputGroup>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="edit()">Update</button>
                    <button v-else class="btn btn-primary" @click="post()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_USERS, POST_USER, PUT_USER } from '@/store/modules/user.module'
import {GET_LINES} from '@/store/modules/line.module'
import {GET_GROUP} from '@/store/modules/group.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Users',
    data() {
        return {
            form: {
                line_id: null,
                group_id: null,
                fullname: null,
                noreg:null,
                password: null,
                phone_number: null,
                is_activated: true
            },
            usersState: [],
            selectedLine: null,
            isUpdate: false
        }
    },
    watch: {
        getUsers: function() {
            this.form = this.getUsers[0]
        }
    },
    computed: {
        ...mapGetters([
            'getUsers',
            'getLinesOptsWithoutAll',
            'getGroupsOptsWithoutAll'
        ])
    },
    methods: {
        async getLines() {
            await this.$store.dispatch(GET_LINES)
        },
        async getGroup() {
            await this.$store.dispatch(GET_GROUP)
        },
        async getUsersStore() {
            await this.$store.dispatch(GET_USERS)
            await this.getGroup()
            await this.getLines()
        },
        async post() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_USER, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah user', '', 'success')
                        this.$router.push('/master/user')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah job', '', 'error')
            }
        },
        async edit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(PUT_USER, this.form)
                    .then(() => {
                        Swal.fire('Berhasil edit user', '', 'success')
                        this.$router.push('/master/user')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal edit user', '', 'error')
            }
        },
        cancel() {
            this.$router.push(`/master/user`)
        }
    },
    async mounted() {
       await this.getUsersStore()
       if(this.$route.query.id) {
            this.isUpdate = true
            await this.$store.dispatch(GET_USERS, {id: this.$route.query.id, isForm: true})
        }
    }
}
</script>