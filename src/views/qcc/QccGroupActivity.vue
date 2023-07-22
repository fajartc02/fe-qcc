<template>
    <div class="card">
        <div class="card-header">
            <div class="d-flex row align-items-center">
                <div class="col-10">
                    QCC Activity Group
                </div>
                <div class="col">
                    <button class="btn btn-success" @click="this.$router.push('/qcc/group/add')">
                        Add Qcc Group<CIcon
                                    icon="cil-plus" 
                                    size="sm"
                                />
                    </button>
                </div>
            </div>
        </div>
        <div class="card-body text-center">
            <div class="row mb-3">
                <div class="col-10">
                    <CInputGroup>
                        <CInputGroupText>Qcc Period</CInputGroupText>
                        <select class="form-control" v-model="activity_id">
                            <option v-for="item in getQccActivitiesOptsWithoutAll" :value="item.id" :key="item.id">{{ item.text }}</option>
                        </select>
                    </CInputGroup>
                </div>
                <!-- <div class="col-4">
                    <CInputGroup>
                        <CInputGroupText>Line</CInputGroupText>
                        <select class="form-control" v-model="line_id">
                            <option v-for="item in getLinesOpts" :value="item.id" :key="item.id">{{ item.text }}</option>
                        </select>
                    </CInputGroup>
                </div> -->
                <div class="col">
                    <button class="btn bg-primary text-light" @click="search()">Search</button>
                </div>
            </div>
            <table class="table table-bordered table-stripped">
                <tr>
                   <th style="border: 1px solid black!important;">No</th>
                   <th style="border: 1px solid black!important;">Line</th>
                   <th style="border: 1px solid black!important;">Shift</th>
                   <th style="border: 1px solid black!important;">Group Name</th>
                   <th style="border: 1px solid black!important;">Theme</th>
                   <th style="border: 1px solid black!important;">Advisor</th>
                   <th style="border: 1px solid black!important;">Facilitator</th>
                   <th style="border: 1px solid black!important;">Circle Leader</th>
                   <th style="border: 1px solid black!important;">Tema Leader</th>
                   <th style="border: 1px solid black!important;">Members</th>
                   <!-- <th style="border: 1px solid black!important;">Dibuat</th> -->
                   <!-- <th style="border: 1px solid black!important;">Tanggal Di buat</th> -->
                   <th style="border: 1px solid black!important;">Actions</th>
                </tr>
                <template v-if="getQccGroup.length > 0">
                    <tr v-for="(qccGroup, i) in getQccGroup" :key="qccGroup.id">
                        <td style="border: 1px solid black!important;">{{ i + 1 }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.line_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.group_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.qcc_group_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.theme_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.advisor_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.facilitator_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.cleader_nm }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.tleader_nm }}</td>
                        <td style="border: 1px solid black!important;">
                            <button class="btn bg-info disabled text-light rounded-all">{{ qccGroup.members.length }}</button>
                        </td>
                        <!-- <td style="border: 1px solid black!important;">{{ qccGroup.created_by }}</td>
                        <td style="border: 1px solid black!important;">{{ qccGroup.created_dt.split('T')[0] }}</td> -->
                        <!-- <td style="border: 1px solid black!important;">
                            <CButton color="warning" @click="edit(shop.id)">
                                <CIcon
                                    icon="cil-pencil" 
                                    size="sm"
                                />
                            </CButton>
                        </td> -->
                        <td style="border: 1px solid black!important;">
                            <CButton class="bg-warning" color="info" @click="popUpRangkuman(qccGroup.group_theme_id)">
                                <CIcon
                                    icon="cil-paper-plane" 
                                    size="sm"
                                />Rangkuman
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
        <CModal
            title="Masukan Rangkuman & evidence"
            size="xl"
            color="warning"
            :visible="modalShow" @close="() => { modalShow = false }"
        >
        <CModalHeader>
            <CModalTitle>Masukan Rangkuman & evidence</CModalTitle>
        </CModalHeader>
        <CModalBody>
            <table class="table table-striped text-center">
                <thead>
                    <tr>
                        <th style="border: 1px solid black!important;">Step</th>
                        <th style="border: 1px solid black!important;">Files</th>
                        <th style="border: 1px solid black!important;">Uploads</th>
                        <th style="border: 1px solid black!important;">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(groupActivity, idx) in getQccGroupActivities" :key="groupActivity.uuid">
                        <td style="border: 1px solid black!important;">
                            {{ groupActivity.step_nm }}
                        </td>
                        <td style="border: 1px solid black!important;">
                            <template v-if="groupActivity.docs_file.length > 0">
                                <template v-for="(file) in groupActivity.docs_file" :key="file.doc_id">
                                    <template v-if="file.docs_path.includes('.pdf')">
                                        <a class="btn bg-info" :href="file.docs_path">
                                            PDF Details {{ file.doc_id }}
                                        </a>
                                    </template>
                                    <template v-else>
                                        <img class="mx-1" :src="file.docs_path" width="100"/>
                                        <!-- {{ file.doc_id }} -->
                                    </template>
                                </template>
                            </template>
                            <template v-else>
                                Belum Ada File
                            </template>
                        </td>
                        <td style="border: 1px solid black!important;">
                            <input class="form-control" multiple type="file" ref="file" @change="uploadFile">
                        </td>
                        <td style="border: 1px solid black!important;">
                            <button class="btn bg-success" :disabled="isLoading" @click="postDocs(groupActivity, idx)">Upload</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </CModalBody>
        <CModalFooter>
            <CButton color="secondary" @click="() => { modalShow = false }">
                Close
            </CButton>
        </CModalFooter>
        </CModal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_QCC_ACTIVITY } from '@/store/modules/qccActivity.module'
import { GET_QCC_GROUP,GET_QCC_GROUP_ACTIVITIES,
    POST_QCC_GROUP_ACTIVITY 
} from '@/store/modules/qccGroup.module'
import { GET_LINES } from '@/store/modules/line.module'
import Swal from 'sweetalert2'

// import Treeselect from 'vue3-treeselect'
// import 'vue3-treeselect/dist/vue3-treeselect.css'
export default {
    name: "QccGroup",
    data() {
        return {
            activity_id: null,
            line_id: "-1",
            stateQccGroups: [],
            modalShow:false,
            docs: [],
            isLoading: false
        }
    },
    watch: {
    },
    computed: {
        ...mapGetters([
            'getQccActivitiesTreeselect',
            'getQccActivitiesOptsWithoutAll',
            'getQccGroup',
            'getLinesOpts',
            'getQccGroupActivities'
        ])
    },
    methods: {
        async search() {
            let filter = {
                activity_id: this.activity_id
            }
            if(this.line_id != '-1') {
                filter.line_id = this.line_id
            }
            console.log(this.line_id);
            await this.$store.dispatch(GET_QCC_GROUP, filter)
        },
        async popUpRangkuman(group_theme_id) {
            console.log(group_theme_id);
            this.$store.dispatch(GET_QCC_GROUP_ACTIVITIES, {group_theme_id})
            this.modalShow = true
        },
        async uploadFile() {
            // this.docs = this.$refs.file.files;
            let mapFiles = await this.$refs.file.map((doc) => {
                console.log(doc.files);
                return doc.files
            })
            this.docs = mapFiles
        },
        async postDocs(item, idxItem) {
            try {
                this.isLoading = true
                console.log(this.docs.length);
                let isNotEmpty = this.docs.length > 0
                if(!isNotEmpty) {
                    this.isLoading = false
                    Swal.fire('Masukan File Terlebih dahulu', '', 'info');
                    return;
                }
                let formData = new FormData()
                formData.append('sub_group_activity_id', item.sub_group_activity_id)
                formData.append('step_nm', item.step_nm)
                formData.append('step_id', item.step_id)
                for (let idx = 0; idx < this.docs[idxItem].length; idx++) {
                    // console.log(this.docs[idxItem][idx]);
                    // const element = this.docs[idxItem]
                    console.log(this.docs[idxItem][idx]);
                    // if(this.docs[idxItem].files)
                    formData.append(`docs`, this.docs[idxItem][idx])
                }
                setTimeout(() => {
                    this.$store.dispatch(POST_QCC_GROUP_ACTIVITY, formData)
                    Swal.fire('File Berhasil di upload', '', 'success');
                    this.isLoading = false
                    this.docs = []
                }, 2000)
            } catch (error) {
                console.log(error);
                Swal.fire('Kesalahan sistem', '', 'error');
            }
        }
    },
    async mounted() {
        localStorage.getItem('line_id') != 'null' ? this.line_id = localStorage.getItem('line_id') : this.line_id = "-1";
        await this.$store.dispatch(GET_QCC_ACTIVITY)
        this.activity_id = this.getQccActivitiesTreeselect[0].id
        await this.search()
        await this.$store.dispatch(GET_LINES)
    },
    // components: {
    //     Treeselect
    // },
}
</script>