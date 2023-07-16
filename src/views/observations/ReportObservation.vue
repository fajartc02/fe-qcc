<template>
    <div class="card">
        <button class="btn btn-primary" @click="exportToPDF()">Export PDF</button>
    </div>
    <div class="card" id="content-pdf" ref="content">
        <div class="card-header">
            <div class="row">
                <div class="col-10">
                    Checksheet Observasi SW
                </div>
                <div class="col">
                    <CButton v-if="!ignoringExport" color="info" @click="() => { xlDemo = true }">Lihat Video</CButton>
                    <CModal size="xl" :visible="xlDemo" @close="() => { xlDemo = false }">
                        <CModalHeader>
                        <CModalTitle>Video Observasi SW</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div class="row">
                                <div class="col border-all">
                                    <h6>Before</h6>
                                    <video muted style="width: 100%;height: 100%;" autoplay controls>
                                        <source src="../../assets/video1.mp4" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                                <div class="col border-all">
                                    <h6>After</h6>
                                    <video muted style="width: 100%;height: 100%;" autoplay controls>
                                        <source src="../../assets/video2.mp4" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                            
                        </CModalBody>
                    </CModal>
                </div>
            </div>
        </div>
        <div class="card-body" v-if="observation">
            <table class="table">
                <tr>
                    <td>Nama: <b>{{ observation.member_nm }}</b></td>
                    <td>Line: <b>{{ observation.line_nm }}</b></td>
                    <td>Pos: <b>{{ observation.pos_nm }}</b></td>
                    <td style="min-width: 300px;">No SOP: <b>{{ observation.job_no }}</b></td>
                    <td>Shift: <b>{{ observation.group_nm }}</b></td>
                </tr>
                <tr class="text-center">
                    <td :colspan="category.category_nm == 'Quality' ? '' : ''" class="bg-warning" v-for="category in categories" :key="category.id">
                        {{ category.category_nm }}
                    </td>
                </tr>
                <tr>
                    <td :colspan="category.category_nm == 'Quality' ? '' : ''" v-for="category in categories" :key="category.id">
                        {{ category.category_desc }}
                    </td>
                </tr>
            </table>
            <table class="table table-bordered">
                <tr class="bg-dark text-light text-center">
                    <th>No</th>
                    <th>Category</th>
                    <th>Judgment</th>
                    <th>Factor</th>
                    <th>Findings</th>
                </tr>
                <tr v-for="(item, i) in categories" :key="i">
                    <td class="text-center">{{ i + 1 }}</td>
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
        </div>
    </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import ApiService from '@/store/api.service';
import moment from 'moment'
export default {
    name: 'ReportObservation',
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
            xlDemo: false,
            ignoringExport: false
        }
    },
    methods: {
        exportToPDF(nameFile) {
            console.log(nameFile);
            this.ignoringExport = true
            html2pdf(this.$refs.content, {
                margin: 1,
                filename: `REPORT_SW_${this.observation.job_no}_${this.observation.pos_nm}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { dpi: 192, letterRendering: true },
                jsPDF: { unit: "pt", format: "a3", orientation: "l" },
                allowTaint: true,
            }).then((pdf) => {
                console.log(pdf);
                // this.$router.go(-1);
                this.ignoringExport = false
                this.dialogLoading = false;
            });
        },
        async getDetail() {
            ApiService.setHeader()
            const detailObser = await ApiService.get(`operational/observation/schedule`, this.$route.params.id)
            this.observation = detailObser.data.data[0]
            let resCheckData = detailObser.data.data[1]
            if(resCheckData.length > 0) this.isCheck = true
            let actualDate = detailObser.data.data[0].actual_check_dt
            this.form.actual_check_dt = actualDate ? moment(actualDate).toISOString().split('T')[0] : moment().toISOString().split('T')[0]
            this.resultCheck = resCheckData
            // if(resCheckData.length > 0) this.exportToPDF(`REPORT_SW_${this.observation.job_no}_${this.observation.pos_nm}.pdf`);
        },
        async getJudgments() {
            ApiService.setHeader()
            const judgments = await ApiService.get(`master/judgments`)
            // console.log(judgments);
            this.judgments = judgments.data.data
        },
        async getFactors() {
            ApiService.setHeader()
            const factors = await ApiService.get(`master/factors`)
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
    },
    async mounted() {
        console.log(this.$route.params.id);
        await this.getDetail()
        await this.getCategories() 
    }
}
</script>

<style scoped>
    .table, th, td {
        border: 1px solid;
    }
</style>