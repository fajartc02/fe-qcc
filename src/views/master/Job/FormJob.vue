<template>
    <div class="card">
        <div class="card-header">
            Master Job
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormSelect v-model="selectedLine">
                    <option value="null">Select Line</option>
                    <option v-for="line in getLinesOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Machine</CInputGroupText>
                <CFormSelect :disabled="!selectedLine" v-model="form.machine_id">
                    <option value="null">Select Machine</option>
                    <option v-for="machine in getMachinesOptsWithoutAll" :key="machine.id" :value="machine.id">{{ machine.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job Type</CInputGroupText>
                <CFormSelect v-model="form.job_type_id">
                    <option>Select Job Type</option>
                    <option v-for="jobType in getJobTypeOptsWithoutAll" :key="jobType.id" :value="jobType.id">{{ jobType.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Pos</CInputGroupText>
                <CFormSelect :disabled="!selectedLine" v-model="form.pos_id">
                    <option>Select Pos</option>
                    <option v-for="pos in getPosOptsWithoutAll" :key="pos.id" :value="pos.id">{{ pos.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Sop No</CInputGroupText>
                <CFormInput v-model="form.job_no"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Job Name</CInputGroupText>
                <CFormInput v-model="form.job_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <input class="form-control" type="file" ref="file" @change="uploadFile">
            </CInputGroup>
            <vue-pdf-embed v-if="embedFile" :source="embedFile" />
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="updateJob()">Update</button>
                    <button v-else class="btn btn-primary" @click="postJob()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {GET_POS} from '@/store/modules/pos.module'
import {GET_JOB,POST_JOB, PUT_JOB} from '@/store/modules/job.module'
import {GET_JOB_TYPE} from '@/store/modules/jobType.module'
import {GET_LINES} from '@/store/modules/line.module'
import {GET_MACHINES} from '@/store/modules/machine.module'
import { mapGetters } from 'vuex'

import VuePdfEmbed from 'vue-pdf-embed'
import Swal from 'sweetalert2'

export default {
    name: 'FormJob',
    data() {
        return {
            selectedLine: null,
            embedFile: null,
            attachment: null,
            form: {
                machine_id: null,
                job_type_id: null,
                pos_id: null,
                job_nm: null,
                job_no: null,
                dest: 'sop'
            },
            posState: [],
            isUpdate: false
        }
    },
    watch: {
        jobData: function() {
            this.posState = this.jobData
            if(this.jobData.length > 0) {
                console.log(this.jobData[0]);
                this.selectedLine = this.jobData[0].line_id
                this.form.machine_id = this.jobData[0].machine_id
                this.form.pos_id = this.jobData[0].pos_id
                this.form.job_nm = this.jobData[0].job_nm
                this.form.job_type_id = this.jobData[0].job_type_id
                this.form.job_no = this.jobData[0].job_no
                this.embedFile = `${process.env.VUE_APP_URL}/file?path=${this.jobData[0].attachment}`
            } 
        },
        selectedLine: function() {
            if(this.selectedLine) {
                let objQuery = {
                    line_id: this.selectedLine
                }
                this.getPos(objQuery)
                this.getMachines(objQuery)
            }
        }
    },
    computed: {
        ...mapGetters([
            'jobData',
            'getPosOptsWithoutAll', 
            'getLinesOptsWithoutAll', 
            'getMachinesOptsWithoutAll',
            'getJobTypeOptsWithoutAll'])
    },
    components: {
        VuePdfEmbed,
    },
    methods: {
        async getLines() {
            await this.$store.dispatch(GET_LINES)
        },
        async getPos(query) {
            await this.$store.dispatch(GET_POS, query)
        },
        async getMachines(query) {
            await this.$store.dispatch(GET_MACHINES, query)
        },
        async getJobType() {
            await this.$store.dispatch(GET_JOB_TYPE)
        },
        uploadFile() {
            this.attachment = this.$refs.file.files[0];
        },
        async postJob() {
            try {
                let formData = new FormData()
                for (const key in this.form) {
                    const element = this.form[key];
                    const isRequired = element != 'null' || element
                    const excepCond = key != 'machine_id'
                    if(isRequired && excepCond) {
                        formData.append(key, element)
                    }
                }
                if(this.attachment) formData.append('attachment', this.attachment)
                await this.$store.dispatch(POST_JOB, formData)
                .then(() => {
                    Swal.fire('Berhasil menambah job', '', 'success')
                    this.$router.push('/master/job')
                })
                
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah job', '', 'error')
            }
        },
        async updateJob() {
            try {
                let formData = new FormData()
                console.log(this.form);
                for (const key in this.form) {
                    const element = this.form[key];
                    console.log(element);
                    formData.append(key, element)
                }
                if(this.attachment) formData.append('attachment', this.attachment)
                console.log(formData);
                await this.$store.dispatch(PUT_JOB, {formData, id: this.$route.query.id})
                .then(() => {
                    Swal.fire('Berhasil mengubah job', '', 'success')
                    this.$router.push('/master/job')
                })
                
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal mengubah job', '', 'error')
            }
        },
        cancel() {
            this.$router.push('/master/job')
        },
    },
    async mounted() {
        await this.getLines()
        await this.getJobType()
        if(this.$route.query.id) {
            this.isUpdate = true
            this.$store.dispatch(GET_JOB, {id: this.$route.query.id})
        }
    }
}
</script>