<template>
    <div>
      <div class="row">
          <div class="col-6">
              <CInputGroup class="mb-3">
                  <CInputGroupText>Line</CInputGroupText>
                  <Select2 v-model="selectedLine" class="form-control" :options="getLinesOpts" />
              </CInputGroup>
          </div>
          <div class="col-6">
              <CInputGroup class="mb-3">
                  <CInputGroupText>Month</CInputGroupText>
                  <input v-model="selectedMonth" class="form-control" type="month">
              </CInputGroup>
          </div>
      </div>
      <CardSummary :selectedLine="selectedLine" :selectedMonth="selectedMonth"/>
      <TableSchedule :selectedLine="selectedLine" :selectedMonth="selectedMonth"/>
    </div>
</template>

<script>
import moment from 'moment'
import TableSchedule from '@/components/table/TableSchedule.vue'
import CardSummary from '@/components/card/CardSummary.vue'

import { GET_LINES } from "@/store/modules/line.module";
import { mapGetters } from 'vuex'


export default {
  name: 'Dashboard',
  data() {
    return {
      selectedMonth: null,
      selectedLine: "-1",
    }
  },
  computed: {
    ...mapGetters(['getLinesOpts'])
  },
  methods: {
    async getLines() {
      try {
        this.$store.dispatch(GET_LINES)
      } catch (error) {
        if(error.response.status == 401) this.$router.push('/login')
        console.log(error);
      }
    }
  },
  mounted() {
    const year = moment(new Date()).toISOString().split('T')[0].split('-')[0]
    const month = moment(new Date()).toISOString().split('T')[0].split('-')[1]
    this.selectedMonth = `${year}-${month}`
    this.getLines()
  },
  components: {
    TableSchedule,
    CardSummary
  },
}
</script>
