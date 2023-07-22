<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Qcc Activity
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/qcc/activity/add')">
                        Add Qcc Activity<CIcon
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
                   <th>Activity Name</th>
                   <th>Total Step</th>
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th>Actions</th>
                </tr>
                <template v-if="stateQccActivities.length > 0">
                    <tr v-for="(activity, i) in stateQccActivities" :key="activity.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ activity.activity_nm }}</td>
                        <td><button class="btn btn-primary text-light bg-primary" disabled>{{ activity.sub_activities.length }}</button></td>
                        <td>{{ activity.created_by }}</td>
                        <td>{{ activity.created_dt.split('T')[0] }}</td>
                        <!-- <td>
                            <CButton color="warning" @click="edit(shop.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td> -->
                        <td>
                            <CButton color="danger" @click="del(activity.uuid)">
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
import { GET_QCC_ACTIVITY, DELETE_QCC_ACTIVITY} from '@/store/modules/qccActivity.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'QccActivity',
    data() {
        return {
            form: {
                shop_id: null,
                shop_nm: null
            },
            stateQccActivities: []
        }
    },
    watch: {
        getQccActivities: function() {
            console.log(this.getQccActivities);
            this.stateQccActivities = this.getQccActivities
        }
    },
    computed: {
        ...mapGetters(['getQccActivities'])
    },
    methods: {
        async getQccActivityStore() {
            await this.$store.dispatch(GET_QCC_ACTIVITY)
        },
        // async edit(id) {
        //     await this.$router.push(`/operational/shop/form?id=${id}`)
        // },
        del(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_QCC_ACTIVITY, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_QCC_ACTIVITY)
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
       await this.getQccActivityStore()
    }
}
</script>