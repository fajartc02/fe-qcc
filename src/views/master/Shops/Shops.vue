<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master shop
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/shop/form')">
                        Add Shop<CIcon
                                    icon="cil-plus" 
                                    size="sm"
                                />
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <table class="table table-bordered table-stripped">
                <tr>
                   <th>No</th>
                   <th>Shop</th>
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="shopState.length > 0">
                    <tr v-for="(shop, i) in shopState" :key="shop.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ shop.shop_nm }}</td>
                        <td>{{ shop.created_by }}</td>
                        <td>{{ shop.created_dt.split('T')[0] }}</td>
                        <td>
                            <CButton color="warning" @click="edit(shop.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                        <td>
                            <CButton color="danger" @click="del(shop.id)">
                                <CIcon
                                    icon="cil-trash" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="6">
                        <h3>Tidak Ada Data</h3>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { GET_SHOPS, DELETE_SHOP} from '@/store/modules/shop.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Shops',
    data() {
        return {
            form: {
                shop_id: null,
                shop_nm: null
            },
            shopState: []
        }
    },
    watch: {
        getShops: function() {
            console.log(this.getShops);
            this.shopState = this.getShops
        }
    },
    computed: {
        ...mapGetters(['getShops'])
    },
    methods: {
        async getShopsStore() {
            await this.$store.dispatch(GET_SHOPS)
        },
        async edit(id) {
            await this.$router.push(`/master/shop/form?id=${id}`)
        },
        del(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_SHOP, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_SHOPS)
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire('Gagal menghapus!', '', 'error')
                    })
                }
            })
        }
    },
    async mounted() {
       await this.getShopsStore()
    }
}
</script>