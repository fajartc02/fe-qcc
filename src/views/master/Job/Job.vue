<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Job
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/master/job/form')">
                        Add Job<CIcon
                                    icon="cil-plus" 
                                    size="sm"
                                />
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <div class="row">
                <div class="col">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Line</CInputGroupText>
                        <Select2 v-model="filtered.line_id" class="form-control" :options="getLinesOpts" />
                    </CInputGroup>
                </div>
                <div class="col">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Pos</CInputGroupText>
                        <Select2 :disabled="filtered.line_id == -1" v-model="filtered.pos_id" class="form-control" :options="getPosOpts" />
                    </CInputGroup>
                </div>
                <div class="col-2">
                    <button class="btn btn-primary" @click="getJob()">Search</button>
                </div>
            </div>
            <table class="table table-bordered table-stripped">
                <tr>
                   <th>No</th>
                   <th>Line</th> 
                   <!-- <th>Mesin</th> -->
                   <th>Pos</th>
                   <th>Type Pekerjaan</th>
                   <th>Job No</th>
                   <th>Job Desc</th>
                   <th>SOP</th>
                   <th>Pembuat</th>
                   <th>Tanggal Di buat</th>
                   <th colspan="2">Actions</th>
                </tr>
                <template v-if="jobState.length > 0">
                    <tr v-for="(job, i) in jobState" :key="job.uuid">
                        <td>{{ i + 1 }}</td>
                        <td>{{ job.line_nm }}</td>
                        <!-- <td>{{ job.machine_nm ? job.machine_nm : '-' }}</td> -->
                        <td>{{ job.pos_nm }}</td>
                        <td>{{ job.job_type_nm }}</td>
                        <td>{{ job.job_no }}</td>
                        <td>{{ job.job_nm }}</td>
                        <td v-if="job.attachment">
                            <CIcon
                                icon="cil-check-circle" 
                                class="text-success"
                                size="xxl"
                            />
                        </td>
                        <td v-else>
                            <CIcon
                                icon="cil-x" 
                                class="text-danger"
                                size="xxl"
                            />
                        </td>
                        <td>{{ job.created_by }}</td>
                        <td>{{ job.created_dt.split('T')[0] }}</td>
                        <td>
                            <CButton color="warning" @click="editPos(job.uuid)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td>
                        <td>
                            <CButton color="danger" @click="deletePos(job.uuid)">
                                <CIcon
                                    icon="cil-trash" 
                                    size="sm"
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
import { GET_LINES } from "@/store/modules/line.module";
import { GET_POS } from "@/store/modules/pos.module";
import {GET_JOB, DELETE_JOB} from '@/store/modules/job.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'

export default {
    name: 'Job',
    data() {
        return {
            form: {
                line_id: null
            },
            filtered: {
                line_id: -1,
                pos_id: -1,
                // job_type_id: null
            },
            jobState: []
        }
    },
    watch: {
        jobData: function() {
            this.jobState = this.jobData
        },
        ['filtered.line_id']: function() {
            this.getPos({line_id: this.filtered.line_id})
        }
    },
    computed: {
        ...mapGetters(['jobData', 'getLinesOpts', 'getPosOpts'])
    },
    methods: {
        async getLines() {
            this.$store.dispatch(GET_LINES)
        },
        async getPos(query) {
            this.$store.dispatch(GET_POS, query)
        },
        async getJob() {
            if(this.filtered.line_id || this.filtered.pos_id) {
                let query = this.filtered
                if(!this.filtered.pos_id) delete query.pos_id
                await this.$store.dispatch(GET_JOB, query)
                return;
            }
            await this.$store.dispatch(GET_JOB)
        },
        async editPos(id) {
            await this.$router.push(`/master/job/form?id=${id}`)
        },
        deletePos(id) {
            Swal.fire({
                title: 'kamu mau menghapus data ini?',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                denyButtonText: `Tidak`,
                }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.$store.dispatch(DELETE_JOB, id)
                    .then(async () => {
                        Swal.fire('Berhasil menghapus!', '', 'success')
                        await this.$store.dispatch(GET_JOB)
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
       await this.getJob()
       await this.getLines()
    }
}
</script>