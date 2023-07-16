<template>
    <div class="card">
        <div class="card-header">
            Master Pos
        </div>
        <div class="card-body text-center">
            <CInputGroup class="mb-3">
                <CInputGroupText>Line</CInputGroupText>
                <CFormSelect v-model="form.line_id">
                    <option>Select Line</option>
                    <option v-for="line in getLinesOptsWithoutAll" :key="line.id" :value="line.id">{{ line.text }}</option>
                </CFormSelect>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>Pos Name</CInputGroupText>
                <CFormInput v-model="form.pos_nm"/>
            </CInputGroup>
            <CInputGroup class="mb-3">
                <CInputGroupText>TSK</CInputGroupText>
                <input class="form-control" type="file" ref="tsk" @change="uploadFile('tsk')">
            </CInputGroup>
            <vue-pdf-embed v-if="displayTSK" :source="displayTSK" />
            <CInputGroup class="mb-3">
                <CInputGroupText>TSKK</CInputGroupText>
                <input class="form-control" type="file" ref="tskk" @change="uploadFile('tskk')">
            </CInputGroup>
            <vue-pdf-embed v-if="displayTSKK" :source="displayTSKK" />
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-1">
                    <button v-if="isUpdate" class="btn btn-primary" @click="updatePos()">Update</button>
                    <button v-else class="btn btn-primary" @click="postPos()">Submit</button>
                </div>
                <div class="col-2">
                    <button class="btn btn-warning" @click="cancel()">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {POST_POS, GET_POS, PUT_POS} from '@/store/modules/pos.module'
import {GET_LINES} from '@/store/modules/line.module'
import { mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import VuePdfEmbed from 'vue-pdf-embed'

export default {
    name: 'FormPos',
    data() {
        return {
            form: {
                line_id: null,
                pos_nm: null,
                dest: 'tsk-tskk'
            },
            posState: [],
            isUpdate: false,
            tsk: null,
            tskk: null,
            displayTSK: null,
            displayTSKK: null
        }
    },
    watch: {
        posData: function() {
            this.posState = this.posData
            if(this.posData.length > 0) {
                this.form.line_id = this.posData[0].line_id
                this.form.pos_nm = this.posData[0].pos_nm
                this.displayTSK = this.posData[0].tsk ? `${process.env.VUE_APP_URL}/file?path=${this.posData[0].tsk}` : null
                this.displayTSKK = this.posData[0].tskk ? `${process.env.VUE_APP_URL}/file?path=${this.posData[0].tskk}` : null
            } 
        }
    },
    computed: {
        ...mapGetters(['posData', 'getLinesOptsWithoutAll'])
    },
    components: {
        VuePdfEmbed,
    },
    methods: {
        uploadFile(state) {
            this[state] = this.$refs[state].files[0];
        },
        async getLines() {
            await this.$store.dispatch(GET_LINES)
        },
        async postPos() {
            try {
                let formData = new FormData()
                for (const key in this.form) {
                    const value = this.form[key]
                    if(value !== 'null' || value) {
                        formData.append(key, value)
                    }
                }
                if(this.tsk) formData.append('tsk', this.tsk)
                if(this.tskk) formData.append('tskk', this.tskk)
                
                await this.$store.dispatch(POST_POS, formData)
                .then(() => {
                    Swal.fire('Berhasil menambah pos', '', 'success')
                    this.$router.push('/master/pos')
                })
                
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal menambah pos', '', 'error')
            }
        },
        async updatePos() {
            try {
                let formData = new FormData()
                for (const key in this.form) {
                    const value = this.form[key]
                    formData.append(key, value)
                }
                if(this.tsk) formData.append('tsk', this.tsk)
                if(this.tskk) formData.append('tskk', this.tskk)
                
                await this.$store.dispatch(PUT_POS, {formData, id: this.$route.query.id})
                .then(() => {
                    Swal.fire('Berhasil mengubah pos', '', 'success')
                    this.$router.push('/master/pos')
                })
                
            } catch (error) {
                console.log(error);
                Swal.fire('Gagal mengubah pos', '', 'error')
            }
        },
        cancel() {
            this.$router.push('/master/pos')
        },
    },
    async mounted() {
        await this.getLines()
        if(this.$route.query.id) {
            this.isUpdate = true
            this.$store.dispatch(GET_POS, {id: this.$route.query.id})
        }
    }
}
</script>