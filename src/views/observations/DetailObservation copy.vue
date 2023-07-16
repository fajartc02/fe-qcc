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
                            <img style="width: 100%;" src="@/assets/TSK.png"/>
                        </CModalBody>
                    </CModal>
                    <CButton color="info" @click="() => { demoTSKK = true }">TSKK</CButton>
                    <CModal size="xl" :visible="demoTSKK" @close="() => { demoTSKK = false }">
                        <CModalHeader>
                        <CModalTitle>TSKK</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <img style="width: 100%;" src="@/assets/TSK.png"/>
                        </CModalBody>
                    </CModal>
                    <CButton color="info" @click="() => { demoSOP = true }">SOP</CButton>
                    <CModal size="xl" :visible="demoSOP" @close="() => { demoSOP = false }">
                        <CModalHeader>
                        <CModalTitle>TSKK</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <img style="width: 100%;" src="@/assets/SOP.png"/>
                        </CModalBody>
                    </CModal>
                </div>
            </div>
        </div>
        <div class="card-body overflow-auto">
            <CInputGroup class="mb-3">
                <CInputGroupText>Actual Date</CInputGroupText>
                <input class="form-control" type="date" v-model="form.actual_check_dt"/>
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
import {GET_OBSERVATION_DETAIL} from '@/store/modules/observation.module'
import { mapGetters } from 'vuex'

import ApiService from '@/store/api.service';
import moment from 'moment'
export default {
    name: 'DetailSchedule',
    data() {
        return {
            observation: null,
            form: {
                actual_check_dt: moment().toISOString().split('T')[0]
            },
            categories: [],
            judgments: [],
            factors: [],
            resultCheck: [],
            isCheck: false,
            demoTSK:false,
            demoTSKK: false,
            demoSOP: false
        }
    },
    computed: {
        ...mapGetters(['ObservationData'])
    },
    methods: {
        viewReport() {
            this.$router.push(`/observation/report/${this.observation.observation_id}`)
        },
        async getDetail() {
            await this.$store.dispatch(GET_OBSERVATION_DETAIL, this.$route.params.id)
            // ApiService.setHeader()
            // const detailObser = await ApiService.get(`operational/observation/schedule`, this.$route.params.id)
            // this.observation = detailObser.data.data[0]
            // let resCheckData = detailObser.data.data[1]
            // if(resCheckData.length > 0) this.isCheck = true
            // let actualDate = detailObser.data.data[0].actual_check_dt
            this.form.actual_check_dt = actualDate ? moment(actualDate).toISOString().split('T')[0] : moment().toISOString().split('T')[0]
            // this.resultCheck = resCheckData
        },
        async getJudgments() {
            ApiService.setHeader()
            const judgments = await ApiService.get(`master/judgments/opts`)
            // console.log(judgments);
            this.judgments = judgments.data.data
        },
        async getFactors() {
            ApiService.setHeader()
            const factors = await ApiService.get(`master/factors/opts`)
            // console.log(factors);
            this.factors = factors.data.data
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
        },
        async postCheckObs() {
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
                actual_check_dt: moment(new Date()).toISOString().split('T').join(' '),
                results_check: this.resultCheck
            }
            console.log(formInput);
            ApiService.setHeader()
            await ApiService.post(`operational/observation/check`, formInput) 
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    async mounted() {
        console.log(this.$route.params.id);
        await this.getDetail()
        await this.getCategories() 
        // await this.getFactors()
        // await this.judgments()
    }
}
</script>