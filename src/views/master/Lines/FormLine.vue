<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Lines
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Shop</CInputGroupText>
                <CFormSelect v-model="form.shop_id">
                    <option value="null">Select Shop</option>
                    <option v-for="shop in getShopsOptsWithoutAll" :key="shop.id" :value="shop.id">{{ shop.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Nama</CInputGroupText>
                <CFormInput v-model="form.line_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Singkatan</CInputGroupText>
                <CFormInput v-model="form.line_snm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Description</CInputGroupText>
                <CFormInput v-model="form.line_desc"/>
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
import { GET_LINES, POST_LINE, PUT_LINE } from '@/store/modules/line.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { GET_SHOPS } from '@/store/modules/shop.module'

export default {
    name: 'Lines',
    data() {
        return {
            form: {
                line_nm: null,
                line_snm: null,
                line_desc: null,
                shop_id: null
            },
            linesState: [],
            selectedLine: null,
            isUpdate: false
        }
    },
    watch: {
        getLines: function() {
            this.form = this.getLines[0]
        }
    },
    computed: {
        ...mapGetters([
            'getLines',
            'getShopsOptsWithoutAll'
        ])
    },
    methods: {
        async getShops() {
            await this.$store.dispatch(GET_SHOPS)
        },
        async getLinesStore() {
            await this.$store.dispatch(GET_LINES)
        },
        async post() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_LINE, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah line', '', 'success')
                        this.$router.push('/master/line')
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
                    await this.$store.dispatch(PUT_LINE, this.form)
                    .then(() => {
                        Swal.fire('Berhasil edit line', '', 'success')
                        this.$router.push('/master/line')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal edit line', '', 'error')
            }
        },
        cancel() {
            this.$router.push(`/master/line`)
        }
    },
    async mounted() {
       await this.getShops()
       if(this.$route.query.id) {
            this.isUpdate = true
            await this.$store.dispatch(GET_LINES, {id: this.$route.query.id, isForm: true})
        }
    }
}
</script>