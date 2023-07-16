<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Schedule Observasi
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/schedule/observation/form')">
                        Add Schedule
                        <CIcon
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
                   <th>Pos</th>
                   <th>Type Pekerjaan</th>
                   <th>Petugas</th>
                   <th>Member</th>
                   <th>Job Desc</th>
                   <th>Planning</th>
                   <th>Actual</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="observationSchedule.length > 0">
                    <tr v-for="(obaservation, i) in observationSchedule" :key="obaservation.uuid">
                        <td>{{ i + 1 }}</td>
                        <td>{{ obaservation.line_nm }}</td>
                        <td>{{ obaservation.pos_nm }}</td>
                        <td>{{ obaservation.job_type_nm }}</td>
                        <td v-if="obaservation.checkers.length > 0">
                            <button v-for="checker in obaservation.checkers" :key="checker.id" class="btn btn-warning text-dark disabled">{{ checker.checker_nm }}</button>
                        </td>
                        <td>{{ obaservation.member_nm }}</td>
                        <td>{{ obaservation.job_nm }}</td>
                        <td>{{ `${obaservation.plan_check_dt}`.split('T')[0] }}</td>
                        <td :class="`${obaservation.actual_check_dt}`.split('T')[0] == 'null' ? 'bg-danger' : ''">{{ `${obaservation.actual_check_dt}`.split('T')[0] != 'null' ? `${obaservation.actual_check_dt}`.split('T')[0] : 'belum cek'}}</td>
                        <!-- <td>
                            <CButton color="warning" @click="editPos(obaservation.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td> -->
                        <td>
                            <CButton color="danger" @click="deletePos(obaservation.id)">
                                <CIcon
                                    icon="cil-trash" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                    </tr>
                </template>
                <!-- <tr v-else>
                    <td colspan="6">
                        <h3>Tidak Ada Data</h3>
                    </td>
                </tr> -->
            </table>
        </div>
    </div>
</template>

<script>
import {GET_OBSERVATION_SCHEDULE_LIST, DELETE_OBSERVATION_LIST} from '@/store/modules/observation.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'ScheduleObservation',
    data() {
        return {
            form: {
                line_id: null
            },
        }
    },
    watch: {
        observationSchedule: function() {
            console.log(this.observationSchedule);
        }
    },
    computed: {
        ...mapGetters(['observationSchedule'])
    },
    methods: {
        async getObservations() {
            await this.$store.dispatch(GET_OBSERVATION_SCHEDULE_LIST)
        },
        async editPos(id) {
            await this.$router.push(`/schedule/observation/form?id=${id}`)
        },
        deletePos(id) {
            console.log(id);
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_OBSERVATION_LIST, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_OBSERVATION_SCHEDULE_LIST)
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
       await this.getObservations()
    }
}
</script>