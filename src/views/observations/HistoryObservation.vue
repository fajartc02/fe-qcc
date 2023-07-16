<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    History Observasi
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <div class="row">
                <div class="col-5">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Line</CInputGroupText>
                        <Select2 v-model="selectedLine" class="form-control" :options="getLinesOpts" />
                    </CInputGroup>
                </div>
                <div class="col-5">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Month</CInputGroupText>
                        <input v-model="selectedMonth" class="form-control" type="month">
                    </CInputGroup>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" @click="getObservations()">Search</button>
                </div>
            </div>
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
                   <th>Actions</th>
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
                        <td>
                            <CButton color="info" @click="details(obaservation.id)">
                                <CIcon
                                    icon="cil-arrow-right" 
                                    size="sm"
                                    class="text-dark"
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
import moment from 'moment'
import {GET_OBSERVATION_SCHEDULE_LIST} from '@/store/modules/observation.module'
import { mapGetters } from 'vuex'
import { GET_LINES } from "@/store/modules/line.module";

export default {
    name: 'ScheduleObservation',
    data() {
        return {
            selectedMonth: null,
            selectedLine: "-1",
            idxMonth: ['01','02','03','04','05','06','07', '08', '09', '10', '11', '12'],
            monthStr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
        }
    },
    watch: {
        observationSchedule: function() {
            console.log(this.observationSchedule);
        }
    },
    computed: {
        ...mapGetters(['observationSchedule', 'getLinesOpts'])
    },
    methods: {
        async getLines() {
            try {
                this.$store.dispatch(GET_LINES)
            } catch (error) {
                if(error.response.status == 401) this.$router.push('/login')
                console.log(error);
            }
        },
        async getObservations() {
            let objQuery = {
                month: this.selectedMonth.split('-')[1], 
                year: this.selectedMonth.split('-')[0]
            }
            if(this.selectedLine != "0") objQuery.line = this.selectedLine
            await this.$store.dispatch(GET_OBSERVATION_SCHEDULE_LIST, objQuery)
        },
        details(id) {
            this.$router.push(`/observation/${id}`)
        }
    },
    async mounted() {
        const year = moment(new Date()).toISOString().split('T')[0].split('-')[0]
        const month = moment(new Date()).toISOString().split('T')[0].split('-')[1]
        this.selectedMonth = `${year}-${month}`
        await this.getLines()
        await this.getObservations()
    }
}
</script>