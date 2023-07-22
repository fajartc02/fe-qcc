import ApiService from "@/store/api.service";
export const GET_QCC_ACTIVITY = "getQccActivitiesStore";
export const GET_QCC_DASHBOARD_ACTIVITIES = "getQccActivitiesDashboardStore";
export const POST_QCC_ACTIVITY = "postQccActivities";
export const PUT_QCC_ACTIVITY = "putQccActivities";
export const DELETE_QCC_ACTIVITY = "deleteQccActivities";

// mutation types
export const SET_QCC_ACTIVITY = "setQccActivities";
export const SET_QCC_DASHBOARD = "setQccDashboard";

const state = {
    qccActivity: null,
    dashboardQcc: []
};

const getters = {
    getQccActivities(state) {
        return state.qccActivity
    },
    getQccActivitiesDashboard(state) {
        return state.dashboardQcc
    },
    getQccActivitiesOpts(state) {
        if (state.qccActivity) {
            const mapQccActivities = state.qccActivity.map(shop => {
                return {
                    id: shop.id,
                    text: shop.shop_nm
                }
            })
            mapQccActivities.push({
                id: "-1",
                text: 'All'
            })
            return mapQccActivities
        }
    },
    getQccActivitiesOptsWithoutAll(state) {
        if (state.qccActivity) {
            const mapQccActivities = state.qccActivity.map(qccActivity => {
                return {
                    id: qccActivity.uuid,
                    text: qccActivity.activity_nm
                }
            })
            return mapQccActivities
        }
    },
    getQccActivitiesTreeselect(state) {
        if (state.qccActivity) {
            const mapQccActivity = state.qccActivity.map(activity => {
                console.log(activity);
                return {
                    id: activity.uuid,
                    name: activity.activity_nm,
                    label: activity.activity_nm
                }
            })
            return mapQccActivity
        }
    }
};

const actions = {
    [GET_QCC_ACTIVITY]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("operational/qccActivity/get", query)
                .then((result) => {
                    const qccActivity = result.data
                    if (qccActivity) {
                        commit(SET_QCC_ACTIVITY, qccActivity.data)
                        resolve(qccActivity.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [GET_QCC_DASHBOARD_ACTIVITIES]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("operational/dashboard/get", query)
                .then((result) => {
                    const qccActivity = result.data
                    if (qccActivity) {
                        commit(SET_QCC_DASHBOARD, qccActivity.data)
                        resolve(qccActivity.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_QCC_ACTIVITY]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('operational/qccActivity/add', data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_QCC_ACTIVITY]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`operational/qccActivity/edit/${ID}`, data)
                .then((result) => {
                    const shop = result.data
                    resolve(shop.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_QCC_ACTIVITY]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`operational/qccActivity/delete/${id}`)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    }
};

const mutations = {
    [SET_QCC_ACTIVITY](state, qccActivity) {
        state.qccActivity = qccActivity;
    },
    [SET_QCC_DASHBOARD](state, dashboardQcc) {
        state.dashboardQcc = dashboardQcc;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};