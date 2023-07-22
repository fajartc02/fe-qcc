<template>
    <div class="container-fluid">
      <div class="row mb-3">
          <div class="col-5">
            <CInputGroup>
              <CInputGroupText>Qcc Period</CInputGroupText>
              <select class="form-control" v-model="activity_id">
                  <option v-for="item in getQccActivitiesOptsWithoutAll" :value="item.id" :key="item.id">{{ item.text }}</option>
              </select>
            </CInputGroup>
          </div>
          <div class="col-5">
            <CInputGroup>
              <CInputGroupText>Line</CInputGroupText>
              <select class="form-control" v-model="selectedLine">
                  <option v-for="item in getLinesOpts" :value="item.id" :key="item.id">{{ item.text }}</option>
              </select>
            </CInputGroup>
          </div>
          <div class="col-2">
            <button class="btn bg-info w-100" @click="search()">Search</button>
          </div>
      </div>
      <div class="card">
        <div class="card-body"> 
          <table class="table table-stripped" style="border: 1px solid black!important;">
            <thead>
              <tr class="text-center">
                <th style="border: 1px solid black!important;">No</th>
                <th style="border: 1px solid black!important;">Line</th>
                <th style="border: 1px solid black!important;">Group Name</th>
                <th style="border: 1px solid black!important;">Theme</th>
                <th style="border: 1px solid black!important;">Progress</th>
                <th class="bg-warning" v-for="(step, i) in getSteps" :key="step.id" style="border: 1px solid black!important;">
                  {{step.step_nm}} <br>
                  <small style="font-size: 10px;color: teal;">({{ getQccActivitiesDashboard[0]?.activities[i].end_time.split('T')[0] }})</small> <br>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(groupActivity, i) in getQccActivitiesDashboard" :key="groupActivity.uuid">
                <td class="text-center" style="border: 1px solid black!important;">{{ i + 1 }}</td>
                <td class="text-center" style="border: 1px solid black!important;">{{groupActivity.line_nm}}</td>
                <td class="text-center" style="border: 1px solid black!important;">{{groupActivity.group_nm}}</td>
                <td style="border: 1px solid black!important;">{{groupActivity.theme_nm}}</td>
                <td class="text-center" style="border: 1px solid black!important;">{{groupActivity.progress}}</td>
                <td class="text-center" v-for="(activity) in groupActivity.activities" :key="activity.uuid" style="border: 1px solid black!important;">
                  <template v-if="new Date(activity.end_time).getTime() < new Date().getTime() && !activity.is_submitted">
                    <b><CIcon class="text-danger" icon="cil-x" size="xl" /></b><br>
                    <small class="text-danger" style="font-weight: bold;">Delay</small>
                  </template>
                  <template v-if="activity.is_submitted">
                      <b><CIcon class="text-success" icon="cil-check-alt" size="xl" /></b><br>
                      <small style="font-size: 10px;">{{new Date(activity.changed_dt).toLocaleDateString()}}</small>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>

<script>
import { GET_QCC_ACTIVITY, GET_QCC_DASHBOARD_ACTIVITIES } from '@/store/modules/qccActivity.module'
import { GET_LINES } from "@/store/modules/line.module";
import { GET_STEPS } from "@/store/modules/step.module";
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',
  data() {
    return {
      selectedMonth: null,
      selectedLine: "-1",
      activity_id: null
    }
  },
  computed: {
    ...mapGetters([
      'getLinesOpts',
      'getSteps',
      'getQccActivitiesOptsWithoutAll',
      'getQccActivitiesDashboard'
    ])
  },
  methods: {
    async getLines() {
      try {
        this.$store.dispatch(GET_LINES)
      } catch (error) {
        if(error.response.status == 401) this.$router.push('/login')
        console.log(error);
      }
    },
    async search() {
      await this.$store.dispatch(GET_QCC_DASHBOARD_ACTIVITIES, {activity_id: this.activity_id, line_id: this.selectedLine})
    }
  },
  async mounted() {
    await this.$store.dispatch(GET_QCC_ACTIVITY)
    await this.getLines()
    this.$store.dispatch(GET_STEPS)
    this.activity_id = this.getQccActivitiesOptsWithoutAll[0].id
    await this.$store.dispatch(GET_QCC_DASHBOARD_ACTIVITIES, {activity_id: this.activity_id, line_id: this.selectedLine})
  },
  components: {
  },
}
</script>
