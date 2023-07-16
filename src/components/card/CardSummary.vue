<template>
    <CCard class="mb-4">
        <CCardHeader>
          <strong>Summary</strong>
        </CCardHeader>
        <CCardBody class="overflow-auto" v-if="observationSummary">
            <CRow>
                <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Delay</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1 class="text-danger">{{observationSummary.delay}}</h1>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Done</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1 class="text-success">{{observationSummary.done}}</h1>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Total</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1>{{observationSummary.done}}/{{observationSummary.total}}</h1>
                        </CCardBody>
                    </CCard>
                </CCol>
                <!-- MOCK DATA -->
                <!-- <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Delay</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1 class="text-danger">0</h1>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Done</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1 class="text-success">4</h1>
                        </CCardBody>
                    </CCard>
                </CCol>
                <CCol>
                    <CCard class="mb-4">
                        <CCardHeader>
                        <strong>Total</strong>
                        </CCardHeader>
                        <CCardBody class="overflow-auto">
                            <h1>4/14</h1>
                        </CCardBody>
                    </CCard>
                </CCol> -->
            </CRow>
        </CCardBody>
    </CCard>
</template>

<script>
import ApiService from '@/store/api.service';
import {GET_OBSERVATION_SUMMARY} from '@/store/modules/observation.module'
import { mapGetters } from 'vuex'
import moment from 'moment';


export default {
    name: 'CardSummary',
    data() {
        return {
            summaryData: null,
            form: {
                month: null,
                year: null,
                line_id: null,
                currentDate: moment().toISOString().split('.')[0].split('T').join(" ")
            }
        }
    },
    props: {
        selectedLine: String,
        selectedMonth: String
    },
    computed: {
        ...mapGetters(['observationSummary'])
    },
    watch: {
        selectedMonth: function () {
            let getMonth = new Date(this.selectedMonth).getMonth() + 1
            let year = new Date(this.selectedMonth).getFullYear()
            this.form.month = getMonth
            this.form.year = year
            this.getSummary()
        },
        selectedLine: function() {
            this.form.line_id = this.selectedLine
            this.getSummary()
        },
        
    },  
    methods: {
        async getSummary() {
            ApiService.setHeader()
            await this.$store.dispatch(GET_OBSERVATION_SUMMARY, this.form)
        }
    },
    
}
</script>

<style scoped>

</style>