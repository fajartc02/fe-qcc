<template>
    
</template>

<script>
export default {
    name: 'TableScheduleMobile',
    props: {
        selectedLine: String,
        selectedMonth: String
    },
    data() {
        return {
            // containerDate: ['01','02','03','04','05','06','07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
            containerDate: [],
            schedules: [],
            idxMonth: ['01','02','03','04','05','06','07', '08', '09', '10', '11', '12'],
            monthStr: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            yearMonth: '',
            currentDate: `${new Date().getDate()}`
        }
    },
    watch: {
        selectedMonth: function() {
            if(this.selectedMonth) {
                this.generateDate()
                let idx = this.idxMonth.indexOf(this.selectedMonth.split('-')[1])
                this.yearMonth = `${this.monthStr[idx]} ${this.selectedMonth.split('-')[0]}`
                this.getObsSchedule()
            }
        },
    }
}
</script>