<template>
    <div class="card">
        <div class="card-body" v-if="observation">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormInput :value="observation.line_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Machine</CInputGroupText>
                <CFormInput :value="observation.machine_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Pos</CInputGroupText>
                <CFormInput :value="observation.pos_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job No.</CInputGroupText>
                <CFormInput :value="observation.job_no" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job name</CInputGroupText>
                <CFormInput :value="observation.job_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job Type</CInputGroupText>
                <CFormInput :value="observation.job_type_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Member</CInputGroupText>
                <CFormInput :value="observation.member_nm" disabled/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Plan Date</CInputGroupText>
                <CFormInput :value="observation.plan_check_dt.split('T')[0]" disabled/>
            </CInputGroup>
        </div>
    </div>
    <div class="card mt-1">
        <div class="card-header">
            <div class="row">
                <div class="col-9">
                    <b>Data Observasi</b>
                </div>
                <div class="d-flex col-3 text-right justify-content-around">
                    <CButton color="info" @click="() => { demoTSK = true }">TSK</CButton>
                    <CModal size="xl" :visible="demoTSK" @close="() => { demoTSK = false }">
                        <CModalHeader>
                        <CModalTitle>TSK</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <vue-pdf-embed v-if="tskFile" :source="tskFile" />
                            <h2 v-else>TIDAK ADA TSK</h2>
                            <!-- <img style="width: 100%;" src="@/assets/TSK.png"/> -->
                        </CModalBody>
                    </CModal>
                    <CButton color="info" @click="() => { demoTSKK = true }">TSKK</CButton>
                    <CModal size="xl" :visible="demoTSKK" @close="() => { demoTSKK = false }">
                        <CModalHeader>
                        <CModalTitle>TSKK</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <vue-pdf-embed v-if="tskkFile" :source="tskkFile" />
                            <h2 v-else>TIDAK ADA TSKK</h2>
                            <!-- <img style="width: 100%;" src="@/assets/TSK.png"/> -->
                        </CModalBody>
                    </CModal>
                    <CButton color="info" @click="() => { demoSOP = true }">SOP</CButton>
                    <CModal size="xl" :visible="demoSOP" @close="() => { demoSOP = false }">
                        <CModalHeader>
                        <CModalTitle>SOP</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <vue-pdf-embed v-if="sopFile" :source="sopFile" />
                            <h2 v-else>TIDAK ADA SOP</h2>
                        </CModalBody>
                    </CModal>
                </div>
            </div>
        </div>
        <div class="card-body overflow-auto">
            <CInputGroup class="mb-3">
                <CInputGroupText>Actual Date</CInputGroupText>
                <input :disabled="isCheck" class="form-control" type="date" v-model="form.actual_check_dt"/>
            </CInputGroup>
            <CInputGroup>
                <CInputGroupText>Shift</CInputGroupText>
                <CFormSelect :disabled="isCheck" v-model="form.group_id">
                    <option>Select Shift</option>
                    <option v-for="judg in groups" :key="judg.id" :value="judg.id">{{ judg.group_nm }}</option>
                </CFormSelect>
            </CInputGroup>
            <table class="table table-bordered">
                <tr>
                    <th>No</th>
                    <th>Cateogry</th>
                    <th>Judgment</th>
                    <th>Factor</th>
                    <th>Findings</th>
                </tr>
                <tr v-for="(item, i) in categories" :key="i">
                    <td>{{ i + 1 }}</td>
                    <td>{{ item.category_nm }}</td>
                    <td>
                        <CFormSelect :disabled="isCheck" v-model="item.judgment_id">
                            <option>Select Judgment</option>
                            <option v-for="judg in judgments" :key="judg.id" :value="judg.id">{{ judg.text }}</option>
                        </CFormSelect>
                    </td>
                    <td v-if="item.judgment_id == '2e247c66-3e9c-44b6-951a-0a26791ad37d' && item.judgment_id">
                        <CFormSelect :disabled="isCheck" v-model="item.factor_id">
                            <option>Select Factor</option>
                            <option v-for="factor in factors" :key="factor.text" :value="factor.id">{{ factor.text }}</option>
                        </CFormSelect>
                    </td>
                    <td v-else></td>
                    <td v-if="item.judgment_id == '2e247c66-3e9c-44b6-951a-0a26791ad37d' && item.judgment_id"><textarea :disabled="isCheck" v-model="item.findings" class="w-100"></textarea></td>
                    <td v-else></td>
                </tr>
            </table>
            <button class="btn btn-primary mr-1" :disabled="isCheck" @click="postCheckObs()">Submit</button>
            <button class="btn btn-info ml-1" :disabled="!isCheck" @click="viewReport()">View Report</button>
        </div>
    </div>
</template>

<script>
import {GET_OBSERVATION_DETAIL, POST_OBSERVATION_CHECK} from '@/store/modules/observation.module'
import { mapGetters } from 'vuex'
import VuePdfEmbed from 'vue-pdf-embed'

import ApiService from '@/store/api.service';
import moment from 'moment'
import Swal from 'sweetalert2';
export default {
    name: 'DetailSchedule',
    data() {
        return {
            observation: null,
            form: {
                actual_check_dt: moment().toISOString().split('T')[0],
                group_id: null
            },
            categories: [],
            judgments: [],
            factors: [],
            groups: [],
            resultCheck: [],
            isCheck: false,
            demoTSK:false,
            sopFile: null,
            tskFile: null,
            tskkFile: null,
            demoTSKK: false,
            demoSOP: false
        }
    },
    watch: {
        observationData: function() {
            if(this.observationData) {
                this.observation = this.observationData[0]
                let resCheckData = this.observationData[1]
                if(resCheckData.length > 0) this.isCheck = true
                let actualDate = this.observationData[0].actual_check_dt
                this.form.actual_check_dt = actualDate ? moment(actualDate).toISOString().split('T')[0] : moment().toISOString().split('T')[0]
                let actualGroup = this.observationData[0].group_id
                this.form.group_id = actualGroup
                this.sopFile = this.observation.sop ? `${process.env.VUE_APP_URL}/file?path=${this.observation.sop}` : null;
                this.tskFile = this.observation.tsk ? `${process.env.VUE_APP_URL}/file?path=${this.observation.tsk}` : null;
                this.tskkFile = this.observation.tskk ? `${process.env.VUE_APP_URL}/file?path=${this.observation.tskk}` : null;
                this.resultCheck = resCheckData
            }
        }
    },
    computed: {
        ...mapGetters(['observationData'])
    },
    components: {
        VuePdfEmbed,
    },
    methods: {
        viewReport() {
            this.$router.push(`/observation/report/${this.observation.observation_id}`)
        },
        async getDetail() {
            await this.$store.dispatch(GET_OBSERVATION_DETAIL, this.$route.params.id)
        },
        async getJudgments() {
            ApiService.setHeader()
            const judgments = await ApiService.get(`master/judgments`)
            this.judgments = judgments.data.data
        },
        async getFactors() {
            ApiService.setHeader()
            const factors = await ApiService.get(`master/factors`)
            this.factors = factors.data.data
        },
        async getGroups() {
            ApiService.setHeader()
            const groups = await ApiService.get(`master/groups`)
            this.groups = groups.data.data
        },
        async getCategories() {
            ApiService.setHeader()
            const categories = await ApiService.get(`master/categories`)
            const mapCategory = categories.data.data.map((itm, i) => {
                itm.judgment_id = null
                itm.factor_id = null
                itm.findings = null
                if(this.resultCheck.length > 0) {
                    let result = this.resultCheck[i]
                    itm.judgment_id = result.judgment_id
                    itm.factor_id = result.factor_id
                    itm.findings = result.findings
                }
                return itm
            })
            this.categories = mapCategory
            await this.getJudgments()
            await this.getFactors()
            await this.getGroups()
        },
        async postCheckObs() {
            try {
                this.resultCheck = []
            for (let i = 0; i < this.categories.length; i++) {
                const element = this.categories[i];
                element.category_id = element.id
                let newObj = {
                    category_id: element.category_id,
                    factor_id: element.factor_id,
                    judgment_id: element.judgment_id,
                    findings: element.findings
                }
                this.resultCheck.push(newObj)
            }
            
            let formInput = {
                observation_id: this.$route.params.id,
                actual_check_dt: this.form.actual_check_dt,
                results_check: this.resultCheck,
                group_id: this.form.group_id
            }
            await this.$store.dispatch(POST_OBSERVATION_CHECK, formInput)
            .then(() => {
                Swal.fire('Pengecekan berhasil di submit', '', 'success')
                setTimeout(() => {
                    this.$router.push('/')
                }, 1000)
            })
            } catch (error) {
                console.log(error);
                Swal.fire('Pengecekan gagal di submit', '', 'error')
            }
        }
    },
    async mounted() {
        await this.getDetail()
        await this.getCategories() 
        // await this.getFactors()
        // await this.judgments()
    }
}
</script>