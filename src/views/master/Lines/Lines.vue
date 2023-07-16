<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Lines
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/line/form')">
                        Add Line<CIcon
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
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="LinesState.length > 0">
                    <tr v-for="(pos, i) in LinesState" :key="pos.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ pos.line_nm }}</td>
                        <td>{{ pos.created_by }}</td>
                        <td>{{ pos.created_dt.split('T')[0] }}</td>
                        <td>
                            <CButton color="warning" @click="editLine(pos.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                        <td>
                            <CButton color="danger" @click="deleteLine(pos.id)">
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
import {GET_LINES, DELETE_LINE} from '@/store/modules/line.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Lines',
    data() {
        return {
            form: {
                line_id: null
            },
            LinesState: []
        }
    },
    watch: {
        getLines: function() {
            console.log(this.getLines);
            this.LinesState = this.getLines
        }
    },
    computed: {
        ...mapGetters(['getLines'])
    },
    methods: {
        async getLinesStore() {
            await this.$store.dispatch(GET_LINES)
        },
        async editLine(id) {
            await this.$router.push(`/master/line/form?id=${id}`)
        },
        deleteLine(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_LINE, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_LINES)
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
       await this.getLinesStore()
    }
}
</script>