<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Qcc Activity
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Qcc Activity Name</CInputGroupText>
                <CFormInput v-model="form.activity_nm"/>
            </CInputGroup>
            <!-- <CFormSelect v-model="form.plant_id">
                <option value="null">Select Plant</option>
                <option v-for="line in getStepsOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
            </CFormSelect> -->
            <div class="row">
                <div class="col-6">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Start Date</CInputGroupText>
                        <input class="form-control" type="date" v-model="form.start_time"/>
                    </CInputGroup>
                </div>
                <div class="col-6">
                    <CInputGroup class="mb-3">
                        <CInputGroupText>Finish Date</CInputGroupText>
                        <input class="form-control" type="date" v-model="form.end_time"/>
                    </CInputGroup>
                </div>
            </div>
            <!-- <CInputGroup class="mb-3"> -->
            <CInputGroupText>Sub Activities</CInputGroupText>
            <table class="table table-bordered table-stripped">
                <thead>
                    <tr>
                        <th>Step</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(subActivity, i) in form.sub_activities" :key="subActivity.step_id">
                        <td>
                            {{ stepsState[i].text }}
                        </td>
                        <td>
                            <input class="form-control" type="date" v-model="subActivity.end_time"/>
                        </td>
                        <td>
                            <input class="form-control" type="date" v-model="subActivity.end_time"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- </CInputGroup> -->
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="edit()">Update</button>
                    <button v-else class="btn btn-primary" @click="submit()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { POST_QCC_ACTIVITY } from '@/store/modules/qccActivity.module'
import {GET_STEPS} from '@/store/modules/step.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import moment from 'moment'

export default {
    name: 'FormQccActivity',
    data() {
        return {
            form: {
                activity_nm: null,
                start_time: moment().format('YYYY-MM-DD'),
                end_time: moment().format('YYYY-MM-DD'),
                sub_activities: []
            },
            stepsState: [],
            selectedLine: null,
            isUpdate: false
        }
    },
    watch: {
        getStepsOptsWithoutAll: function() {
            if(this.getStepsOptsWithoutAll.length > 0) {
                this.stepsState = this.getStepsOptsWithoutAll
                this.form.sub_activities = this.getStepsOptsWithoutAll.map(step => {
                    return {
                        step_id: step.step_id,
                        start_time: moment().format('YYYY-MM-DD'),
                        end_time: moment().format('YYYY-MM-DD'),
                    }
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'getStepsOptsWithoutAll',
        ])
    },
    methods: {
        async getStepsStore() {
            await this.$store.dispatch(GET_STEPS)
        },
        async submit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_QCC_ACTIVITY, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah Qcc Activity', '', 'success')
                        this.$router.push('/qcc/activity')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah Qcc Activity', '', 'error')
            }
        },
        // async edit() {
        //     try {
        //         let isRequired = true
        //         for (const key in this.form) {
        //             if(!this.form[key]) isRequired = false
        //         }
        //         if(isRequired) {
        //             await this.$store.dispatch(PUT_SHOP, this.form)
        //             .then(() => {
        //                 Swal.fire('Berhasil edit shop', '', 'success')
        //                 this.$router.push('/master/shop')
        //             })
        //             return;
        //         }
        //         Swal.fire('Lengkapi Input data', '', 'info')
        //     } catch (error) {
        //         console.log(error);
        //         Swal.fire('Gagal edit shop', '', 'error')
        //     }
        // },
        cancel() {
            this.$router.push(`/qcc/activity`)
        }
    },
    async mounted() {
        this.getStepsStore()
        if(this.$route.query.id) {
            this.isUpdate = true
            // await this.$store.dispatch(GET_SHOPS, {id: this.$route.query.id, isForm: true})
        }
    }
}
</script>