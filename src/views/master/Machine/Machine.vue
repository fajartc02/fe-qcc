<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Machines
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/machine/form')">
                        Add Machine<CIcon
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
                   <th>Machine</th>
                   <th>Op No</th>
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="MachinesState.length > 0">
                    <tr v-for="(machine, i) in MachinesState" :key="machine.id">
                        <td>{{ i + 1 }}</td>
                        <td>{{ machine.line_nm }}</td>
                        <td>{{ machine.machine_nm }}</td>
                        <td>{{ machine.op_no }}</td>
                        <td>{{ machine.created_by }}</td>
                        <td>{{ machine.created_dt.split('T')[0] }}</td>
                        <td>
                            <CButton color="warning" @click="edit(machine.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                        <td>
                            <CButton color="danger" @click="del(machine.id)">
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
import {GET_MACHINES, DELETE_MACHINE} from '@/store/modules/machine.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Machines',
    data() {
        return {
            form: {
                machine_id: null
            },
            MachinesState: []
        }
    },
    watch: {
        getMachines: function() {
            this.MachinesState = this.getMachines
        }
    },
    computed: {
        ...mapGetters(['getMachines'])
    },
    methods: {
        async getMachinesStore() {
            await this.$store.dispatch(GET_MACHINES)
        },
        async edit(id) {
            await this.$router.push(`/master/machine/form?id=${id}`)
        },
        del(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_MACHINE, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus machine', '', 'success')
                        await this.$store.dispatch(GET_MACHINES)
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire('Gagal menghapus machine', '', 'error')
                    })
                }
            })
        }
    },
    async mounted() {
       await this.getMachinesStore()
    }
}
</script>