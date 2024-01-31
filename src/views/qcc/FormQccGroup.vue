<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Daftar QCC Group
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>QCC Periode</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.activity_id" :options="getQccActivitiesTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Qcc Group Name</CInputGroupText>
                <CFormInput v-model="form.qcc_group_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Thema QCC</CInputGroupText>
                <CFormInput v-model="form.theme_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.line_id" :options="getLinesTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Shift</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.group_id" :options="getGroupsTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Advisor</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.advisor_nm" :options="getUsersTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Facilitator</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.facilitator_nm" :options="getUsersTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Circle Leader</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.cleader_nm" :options="getUsersTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Tema Leader</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.tleader_nm" :options="getUsersTreeselect" />
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Anggota</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="form.members" :multiple="true" :options="getUsersTreeselect" />
            </CInputGroup>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="edit()">Update</button>
                    <button v-else class="btn btn-primary" @click="submit()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_USERS } from '@/store/modules/user.module'
import { GET_GROUP } from '@/store/modules/group.module'
import { GET_LINES } from '@/store/modules/line.module'
import { GET_QCC_ACTIVITY } from '@/store/modules/qccActivity.module'
import { POST_QCC_GROUP } from '@/store/modules/qccGroup.module'

import Treeselect from 'vue3-treeselect'
import 'vue3-treeselect/dist/vue3-treeselect.css'

import Swal from 'sweetalert2'
// import moment from 'moment'
export default {
    name: "FormQccGroup",
    data() {
        return {
            form: {
                activity_id: null,
                line_id: null,
                group_id: null,
                theme_nm: null,
                advisor_nm: null,
                facilitator_nm: null,
                cleader_nm: null,
                tleader_nm: null,
                qcc_group_nm: null,
                members: []
            },
            selectedLine: null
        }
    },
    computed: {
        ...mapGetters([
            'getUsersTreeselect', 
            'getGroupsTreeselect', 
            'getLinesTreeselect',
            'getQccActivitiesTreeselect'
        ])
    },
    methods: {
        async submit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_QCC_GROUP, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah Qcc Group', '', 'success')
                        this.$router.push('/qcc/group')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah Qcc Group', '', 'error')
            }
        }
    },
    async mounted() {
        await this.$store.dispatch(GET_USERS)
        await this.$store.dispatch(GET_GROUP)
        await this.$store.dispatch(GET_LINES)
        await this.$store.dispatch(GET_QCC_ACTIVITY)
        // console.log(this.getQccActivitiesTreeselect);
    },
    components: {
        Treeselect
    },
}
</script>