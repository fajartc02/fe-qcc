<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Qcc Group
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/qcc/group/add')">
                        Add Qcc Group<CIcon
                                    icon="cil-plus" 
                                    size="sm"
                                />
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <div class="row mb-3">
                <div class="col-4">
                    <CInputGroup>
                        <CInputGroupText>Qcc Period</CInputGroupText>
                        <select class="form-control" v-model="activity_id">
                            <option v-for="item in getQccActivitiesOptsWithoutAll" :value="item.id" :key="item.id">{{ item.text }}</option>
                        </select>
                    </CInputGroup>
                </div>
                <div class="col-4">
                    <CInputGroup>
                        <CInputGroupText>Line</CInputGroupText>
                        <select class="form-control" v-model="line_id">
                            <option v-for="item in getLinesOpts" :value="item.id" :key="item.id">{{ item.text }}</option>
                        </select>
                    </CInputGroup>
                </div>
                <div class="col">
                    <button class="btn bg-primary text-light" @click="search()">Search</button>
                </div>
            </div>
            <table class="table table-bordered table-stripped">
                <tr>
                   <th style="border: 1px solid black!important;">No</th>
                   <th style="border: 1px solid black!important;">Line</th>
                   <th style="border: 1px solid black!important;">Shift</th>
                   <th style="border: 1px solid black!important;">Group Name</th>
                   <th style="border: 1px solid black!important;">Theme</th>
                   <th style="border: 1px solid black!important;">Advisor</th>
                   <th style="border: 1px solid black!important;">Facilitator</th>
                   <th style="border: 1px solid black!important;">Circle Leader</th>
                   <th style="border: 1px solid black!important;">Team Leader</th>
                   <th style="border: 1px solid black!important;">Members</th>
                   <!-- <th style="border: 1px solid black!important;">Dibuat</th> -->
                   <!-- <th style="border: 1px solid black!important;">Tanggal Di buat</th> -->
                   <th v-if="is_admin" style="border: 1px solid black!important;">Actions</th>
                </tr>
                <template v-if="getQccGroup.length > 0">
                    <tr v-for="(qccGroup, i) in getQccGroup" :key="qccGroup.id">
                        <td style="border: 1px solid black!important;">{{ i + 1 }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.line_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.group_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.qcc_group_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.theme_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.advisor_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.facilitator_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.cleader_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.tleader_nm }}</td>
                        <td style="border: 1px solid black!important;">
                            <button class="btn bg-info disabled text-light rounded-all">{{ qccGroup.members.length }}</button>
                        </td>
                        <!-- <td style="border: 1px solid black!important;">{{ qccGroup.created_by }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.created_dt.split('T')[0] }}</td> -->
                        <!-- <td style="border: 1px solid black!important;">
                            <CButton color="warning" @click="edit(shop.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td> -->
                        <td v-if="is_admin" style="border: 1px solid black!important;">
                            <CButton color="danger" @click="del(qccGroup.uuid)">
                                <CIcon
                                    icon="cil-trash" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                    </tr>
                </template>
                <tr v-else>
                    <td colspan="10">
                        <h3>Tidak Ada Data</h3>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_QCC_ACTIVITY } from '@/store/modules/qccActivity.module'
import { GET_QCC_GROUP,DELETE_QCC_GROUP } from '@/store/modules/qccGroup.module'
import { GET_LINES } from '@/store/modules/line.module'
import Swal from 'sweetalert2'

// import Treeselect from 'vue3-treeselect'
// import 'vue3-treeselect/dist/vue3-treeselect.css'
export default {
    name: "QccGroup",
    data() {
        return {
            activity_id: null,
            line_id: "-1",
            stateQccGroups: [],
            is_admin: false
        }
    },
    watch: {
    },
    computed: {
        ...mapGetters([
            'getQccActivitiesTreeselect',
            'getQccActivitiesOptsWithoutAll',
            'getQccGroup',
            'getLinesOpts'
        ])
    },
    methods: {
        async del(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_QCC_GROUP, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        // await this.$store.dispatch(GET_QCC_GROUP)
                        this.search()
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire('Gagal menghapus!', '', 'error')
                    })
                }
            })
        },
        async search() {
            let filter = {
                activity_id: this.activity_id
            }
            if(this.line_id != '-1') {
                filter.line_id = this.line_id
            }
            await this.$store.dispatch(GET_QCC_GROUP, filter)
        }
    },
    async mounted() {
        await this.$store.dispatch(GET_QCC_ACTIVITY)
        this.activity_id = this.getQccActivitiesTreeselect[0].id
        await this.search()
        await this.$store.dispatch(GET_LINES)
        localStorage.getItem('is_admin') == 'true' ? this.is_admin = true : this.is_admin = false
    },
    // components: {
    //     Treeselect
    // },
}
</script>