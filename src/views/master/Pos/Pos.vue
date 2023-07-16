<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Pos
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/pos/form')">
                        Add Pos<CIcon
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
                   <th>Line</th> 
                   <th>Pos Name</th>
                   <th>TSK</th>
                   <th>TSKK</th>
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="posState.length > 0">
                    <tr v-for="(pos, i) in posState" :key="pos.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ pos.line_nm }}</td>
                        <td>{{ pos.pos_nm }}</td>
                        <td v-if="pos.tsk">
                            <CIcon
                                icon="cil-check-circle" 
                                class="text-success"
                                size="xxl"
                            />
                        </td>
                        <td v-else>
                            <CIcon
                                icon="cil-x" 
                                class="text-danger"
                                size="xxl"
                            />
                        </td>
                        <td v-if="pos.tskk">
                            <CIcon
                                icon="cil-check-circle" 
                                class="text-success"
                                size="xxl"
                            />
                        </td>
                        <td v-else>
                            <CIcon
                                icon="cil-x" 
                                class="text-danger"
                                size="xxl"
                            />
                        </td>
                        <td>{{ pos.created_by }}</td>
                        <td>{{ pos.created_dt.split('T')[0] }}</td>
                        <td>
                            <CButton color="warning" @click="editPos(pos.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                        <td>
                            <CButton color="danger" @click="deletePos(pos.id)">
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
import {GET_POS, DELETE_POS} from '@/store/modules/pos.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Pos',
    data() {
        return {
            form: {
                line_id: null
            },
            posState: []
        }
    },
    watch: {
        posData: function() {
            console.log(this.posData);
            this.posState = this.posData
        }
    },
    computed: {
        ...mapGetters(['posData'])
    },
    methods: {
        async getPos() {
            await this.$store.dispatch(GET_POS)
        },
        async editPos(id) {
            await this.$router.push(`/master/pos/form?id=${id}`)
        },
        deletePos(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_POS, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_POS)
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
       await this.getPos()
    }
}
</script>