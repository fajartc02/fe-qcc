<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    Master Machines
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormSelect v-model="form.line_id">
                    <option value="null">Select Line</option>
                    <option v-for="line in getLinesOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Machine</CInputGroupText>
                <CFormInput v-model="form.machine_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>OP No.</CInputGroupText>
                <CFormInput v-model="form.op_no"/>
            </CInputGroup>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="edit()">Update</button>
                    <button v-else class="btn btn-primary" @click="post()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GET_MACHINES, POST_MACHINE, PUT_MACHINE } from '@/store/modules/machine.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { GET_LINES } from '@/store/modules/line.module'

export default {
    name: 'Machines',
    data() {
        return {
            form: {
                machine_nm: null,
                line_id: null,
                op_no: null,
            },
            linesState: [],
            selectedLine: null,
            isUpdate: false
        }
    },
    watch: {
        getMachines: function() {
            let obj = {
                id: this.getMachines[0].id,
                machine_nm: this.getMachines[0].machine_nm,
                line_id: this.getMachines[0].line_id,
                op_no: this.getMachines[0].op_no,
            }
            this.form = obj
        }
    },
    computed: {
        ...mapGetters([
            'getMachines',
            'getLinesOptsWithoutAll'
        ])
    },
    methods: {
        async getLines() {
            await this.$store.dispatch(GET_LINES)
        },
        async getMachinesStore() {
            await this.$store.dispatch(GET_MACHINES)
        },
        async post() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(POST_MACHINE, this.form)
                    .then(() => {
                        Swal.fire('Berhasil menambah machine', '', 'success')
                        this.$router.push('/master/machine')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah job', '', 'error')
            }
        },
        async edit() {
            try {
                let isRequired = true
                for (const key in this.form) {
                    if(!this.form[key]) isRequired = false
                }
                if(isRequired) {
                    await this.$store.dispatch(PUT_MACHINE, this.form)
                    .then(() => {
                        Swal.fire('Berhasil edit machine', '', 'success')
                        this.$router.push('/master/machine')
                    })
                    return;
                }
                Swal.fire('Lengkapi Input data', '', 'info')
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal edit machine', '', 'error')
            }
        },
        cancel() {
            this.$router.push(`/master/machine`)
        }
    },
    async mounted() {
       await this.getLines()
       if(this.$route.query.id) {
            this.isUpdate = true
            await this.$store.dispatch(GET_MACHINES, {id: this.$route.query.id, isForm: true})
        }
    }
}
</script>