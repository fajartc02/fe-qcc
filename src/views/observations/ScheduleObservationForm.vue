<template>
    <div class="card">
        <div class="card-header">
            Master Job
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormSelect v-model="selectedLine">
                    <option value="-1">Select Line</option>
                    <option v-for="line in getLinesOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Pos</CInputGroupText>
                <CFormSelect :disabled="selectedLine == -1" v-model="form.pos_id">
                    <option>Select Pos</option>
                    <option v-for="pos in getPosOptsWithoutAll" :key="pos.id" :value="pos.id">{{ pos.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job</CInputGroupText>
                <CFormSelect :disabled="!form.pos_id" v-model="form.job_id">
                    <option>Select Job</option>
                    <option v-for="job in getJobOpts" :key="job.id" :value="job.id">{{ job.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Shift</CInputGroupText>
                <CFormSelect :disabled="selectedLine == -1" v-model="form.group_id">
                    <option>Select Shift</option>
                    <option v-for="group in getGroupsOptsWithoutAll" :key="group.id" :value="group.id">{{ group.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Member</CInputGroupText>
                <CFormSelect :disabled="selectedLine == -1 && !form.group_id" v-model="form.member_nm">
                    <option>Select Member</option>
                    <option v-for="member in getUsersOptsWithoutAll" :key="member.id" :value="member.name">{{ member.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <!-- <CInputGroup class="mb-3">
                <CInputGroupText>Petugas</CInputGroupText>
                <treeselect :disabled="selectedLine == -1" class="w-50" v-model="checkers" :multiple="true" :options="getUsersTreeselect" />
            </CInputGroup> -->
            <CInputGroup class="mb-3">
                <CInputGroupText>Plan Date</CInputGroupText>
                <input class="form-control" type="date" v-model="form.plan_check_dt">
            </CInputGroup>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="updateJob()">Update</button>
                    <button v-else class="btn btn-primary" @click="postSchedule()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { POST_OBSERVATION_SCHEDULE, GET_OBSERVATION_SCHEDULE_LIST } from '@/store/modules/observation.module'
import { GET_JOB } from '@/store/modules/job.module'
import { GET_USERS } from '@/store/modules/user.module'
import { GET_LINES } from '@/store/modules/line.module'
import { GET_POS } from '@/store/modules/pos.module'
import { GET_GROUP } from '@/store/modules/group.module'
import { mapGetters } from 'vuex'

// import formatDate from '@/functions/formatDate'

// import Treeselect from 'vue3-treeselect'

import 'vue3-treeselect/dist/vue3-treeselect.css'
import moment from 'moment'

import Swal from 'sweetalert2'

export default {
    name: 'ScheduleObservationForm',
    data() {
        return {
            selectedLine: "-1",
            form: {
                pos_id: null,
                job_id: null,
                group_id: null,
                member_nm: null,
                plan_check_dt: moment(new Date()).format('YYYY-MM-DD')
            },
            checkers: null,
            isUpdate: false
        }
    },
    watch: {
        selectedLine: async function() {
            await this.getPos({line_id: this.selectedLine})
            await this.getUser({line_id: this.selectedLine})
        },
        ['form.pos_id']: function() {
            if(this.form.pos_id) this.getJob({pos_id: this.form.pos_id})
        },
        ['form.group_id']: function() {
            if(this.form.group_id && this.selectedLine != '-1') this.getUser({group_id: this.form.group_id, line_id: this.selectedLine})
        },
        observationSchedule: async function() {
            if(this.observationSchedule.length > 0) {
                let observation = this.observationSchedule[0]
                this.form.pos_id = observation.pos_id
                this.form.job_id = observation.job_id
                this.form.group_id = observation.group_id
                this.selectedLine = observation.line_id
                this.form.member_nm = observation.member_nm
            }
        },
        getUsersTreeselect: async function() {
            let observation = this.observationSchedule[0]
            this.checkers = await observation.checkers.map(checker => {
                return checker.checker_nm
            })
        }

    },
    components: {
        // Treeselect
    },
    computed: {
        ...mapGetters([
            'getPosOptsWithoutAll', 
            'getLinesOptsWithoutAll', 
            'getMachinesOptsWithoutAll',
            'getJobTypeOptsWithoutAll',
            'getJobOpts',
            'getUsersOptsWithoutAll',
            'getGroupsOptsWithoutAll',
            'getUsersTreeselect',
            'observationSchedule'])
    },
    methods: {
        async getGroup() {
            await this.$store.dispatch(GET_GROUP)
        },
        async getPos(query = null) {
            if(query) {
                await this.$store.dispatch(GET_POS, query)
                return
            }
            await this.$store.dispatch(GET_POS)
            
        },
        async getJob(query = null) {
            if(query) {
                await this.$store.dispatch(GET_JOB, query)
                return
            }
            await this.$store.dispatch(GET_JOB)
        },
        async getLines(query = null) {
            if(query) {
                await this.$store.dispatch(GET_LINES, query)
                return
            }
            await this.$store.dispatch(GET_LINES)
        },
        async getUser(query = null) {
            if(query) {
                await this.$store.dispatch(GET_USERS, query)
                return
            }
            await this.$store.dispatch(GET_USERS)
        },
        async postSchedule() {
            try {
                let notAllow = []
                for (const key in this.form) {
                    if(!this.form[key]) {
                        notAllow.push(key)
                    }
                }
                if(notAllow.length > 0) {
                    Swal.fire('Lengkapi data terlebih dahulu', '', 'info')
                    return;
                }
                let mapCheckers = this.checkers.map(checker => {
                    return {
                        checker_nm: checker
                    }
                })
                this.form.checkers = mapCheckers
                this.$store.dispatch(POST_OBSERVATION_SCHEDULE, this.form)
                .then(() => {
                    Swal.fire('Success menambah schedule', '', 'success')
                    this.$router.push('/schedule/observation')
                })
            } catch (error) {
                Swal.fire('Gagal menambah schedule', '', 'error')
            }
            
        },
        cancel() {
            this.$router.push('/schedule/observation')
        },
        
    },
    async mounted() {
        if(this.$route.query.id) {
            this.isUpdate = true
            await this.getLines()
            await this.getGroup()
            await this.getPos()
            await this.getJob()
            await this.$store.dispatch(GET_OBSERVATION_SCHEDULE_LIST, {id: this.$route.query.id})
        }
        await this.getLines()
        await this.getGroup()
    }
}
</script>