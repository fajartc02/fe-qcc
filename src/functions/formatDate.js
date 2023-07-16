const formatDate = {
        YYYYMMDD: (date) => {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            return [year, month, day].join("-");
        },
        ISOLocaleString: (date) => {
            const pad = n => n < 10 ? '0' + n : n;
            return date.getFullYear() + '-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate()) + 'T' +
                pad(date.getHours()) + ':' +
                pad(date.getMinutes())
        },
        getMondayThisWeek: (date) => {
            console.log(date);
            const today = new Date(date);
            const first = today.getDate() - today.getDay() + 1;

            const monday = new Date(today.setDate(first));
            return monday
        },
        YYYYMMDD_HHMM: (date) => {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            let datetext = d.toTimeString();
            // datestring is "20:32:01 GMT+0530 (India Standard Time)"
            // Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]
            // Take the first value from array :)
            let hhmmss = datetext.split(' ')[0];
            let hhmm = `${hhmmss.split(':')[0]}:${hhmmss.split(':')[1]}`
                // console.log(month);
            return `${[year, month, day].join("-")} ${hhmm}`;
        },
        YYYYMMDD_HHMMSS: (date) => {
            var d = new Date(date),
                month = "" + (d.getMonth() + 1),
                day = "" + d.getDate(),
                year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            let datetext = d.toTimeString();
            // datestring is "20:32:01 GMT+0530 (India Standard Time)"
            // Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]
            // Take the first value from array :)
            let hhmmss = datetext.split(' ')[0];
            let hhmm = `${hhmmss.split(':')[0]}:${hhmmss.split(':')[1]}:${hhmmss.split(':')[2]}`
                // console.log(month);
            return `${[year, month, day].join("-")} ${hhmm}`;
        },
        DDMMYY: (date) => {
                var d = new Date(date),
                    month = "" + (d.getMonth() + 1),
                    day = "" + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                // let datetext = d.toTimeString();
                // datestring is "20:32:01 GMT+0530 (India Standard Time)"
                // Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]
                // Take the first value from array :)
                // let hhmmss = datetext.split(' ')[0];
                // let hhmm = `${hhmmss.split(':')[0]}:${hhmmss.split(':')[1]}`
                // console.log(month);
                return `${[day, month, `${year}`.slice(2, 4)].join("-")}`;
    },
    YYYYMM: (date) => {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month].join("-");
    },
    getLastDate: (date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        )
    },
    getFirstDate: (date) => {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            1
        )
    },
    InaDDMMYYYY: (date) => {
        let containerMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let month = containerMonth[date.getMonth()]
        return `${day} ${month} ${date.getFullYear()}`
    },
    InaDDMM: (date) => {
        let containerMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
        let month = containerMonth[date.getMonth()]
        return `${day} ${month}`
    },
    InaMMYYYY: (date) => {
        let containerMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        let month = containerMonth[date.getMonth()]
        return `${month} ${date.getFullYear()}`
    }

}

export default formatDate;