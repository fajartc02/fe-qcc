<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Shops
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Plant</CInputGroupText>
                <CFormSelect v-model="form.plant_id">
                    <option value="null">Select Plant</option>
                    <option v-for="line in getPlantsOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Shop Name</CInputGroupText>
                <CFormInput v-model="form.shop_nm"/>
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
import { GET_SHOPS,PUT_SHOP, POST_SHOP } from '@/store/modules/shop.module'
import {GET_PLANTS} from '@/store/modules/plant.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Shops',
    data() {
        return {
            form: {
                plant_id: null,
                shop_nm: null
            },
            shopsState: [],
            selectedLine: null,
            isUpdate: false
        }
    },
    watch: {
        getShops: function() {
            this.form = this.getShops[0]
        }
    },
    computed: {
        ...mapGetters([
            'getShops',
            'getPlantsOptsWithoutAll',
        ])
    },
    methods: {
        async getPlants() {
            await this.$store.dispatch(GET_PLANTS)
        },
        async getShopsStore() {
            await this.$store.dispatch(GET_SHOPS)
            await this.getPlants()
        },
        async submit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_SHOP, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah shop', '', 'success')
                        this.$router.push('/master/shop')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah shop', '', 'error')
            }
        },
        async edit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(PUT_SHOP, this.form)
                    .then(() => {
                        Swal.fire('Berhasil edit shop', '', 'success')
                        this.$router.push('/master/shop')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal edit shop', '', 'error')
            }
        },
        cancel() {
            this.$router.push(`/master/shop`)
        }
    },
    async mounted() {
        await this.getPlants()
        if(this.$route.query.id) {
            this.isUpdate = true
            await this.$store.dispatch(GET_SHOPS, {id: this.$route.query.id, isForm: true})
        }
    }
}
</script>