import ApiService from "@/store/api.service";
export const GET_QCC_GROUP = "getQccGroupStore";
export const GET_QCC_GROUP_ACTIVITIES = "getQccGroupActivitiesStore";
export const POST_QCC_GROUP = "postQccGroup";
export const POST_QCC_GROUP_ACTIVITY = "postQccGroupActivity";
export const PUT_QCC_GROUP = "putQccGroup";
export const DELETE_QCC_GROUP = "deleteQccGroup";

// mutation types
export const SET_QCC_GROUP = "setQccGroup";
export const SET_QCC_GROUP_ACTIVITIES = "setQccGroupActivities";

const state = {
    qccGroup: [],
    qccGroupActivities: []
};

const getters = {
    getQccGroup(state) {
        return state.qccGroup
    },
    getQccGroupActivities(state) {
        state.qccGroupActivities.sort((a, b) => {
            return a.step_id - b.step_id
        })
        return state.qccGroupActivities
    },
};

const actions = {
    [GET_QCC_GROUP]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("operational/qccGroup/get", query)
                .then((result) => {
                    const qccGroup = result.data
                    if (qccGroup) {
                        commit(SET_QCC_GROUP, qccGroup.data)
                        resolve(qccGroup.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    // {{protocol}}{{hostname}}{{apiVersion}}/operational/qccGroup/subActivities/get?group_theme_id=1
    [GET_QCC_GROUP_ACTIVITIES]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("/operational/qccGroup/subActivities/get", query)
                .then((result) => {
                    const qccGroupActivities = result.data
                    if (qccGroupActivities) {
                        commit(SET_QCC_GROUP_ACTIVITIES, qccGroupActivities.data)
                        resolve(qccGroupActivities.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_QCC_GROUP_ACTIVITY]({ commit }, data = null) {
        console.log(data);
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post(`operational/qccGroup/subActivities/add?sub_group_activity_id=${data.sub_group_activity_id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then((result) => {
                    const docs = result.data
                    resolve(docs.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_QCC_GROUP]({ commit }, data = null) {
        ApiService.setHeader()
        console.log(data);
        const activityID = data.activity_id
        delete data.activity_id
        return new Promise((resolve, reject) => {
            ApiService.post(`operational/qccGroup/add?activity_id=${activityID}`, data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_QCC_GROUP]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`operational/qccGroup/edit/${ID}`, data)
                .then((result) => {
                    const shop = result.data
                    resolve(shop.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_QCC_GROUP]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`operational/qccGroup/delete/${id}`)
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
    [SET_QCC_GROUP](state, qccGroup) {
        state.qccGroup = qccGroup;
    },
    [SET_QCC_GROUP_ACTIVITIES](state, qccGroupActivities) {
        state.qccGroupActivities = qccGroupActivities;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};