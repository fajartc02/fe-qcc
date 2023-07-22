import ApiService from "@/store/api.service";
export const GET_STEPS = "getStepsStore";
export const POST_STEP = "postSteps";
export const PUT_STEP = "putSteps";
export const DELETE_STEP = "deleteSteps";

// mutation types
export const SET_STEPS = "setSteps";

const state = {
    steps: null
};

const getters = {
    getSteps(state) {
        return state.steps
    },
    getStepsOpts(state) {
        if (state.steps) {
            const mapSteps = state.steps.map(step => {
                return {
                    id: step.id,
                    text: step.step_nm
                }
            })
            mapSteps.push({
                id: "-1",
                text: 'All'
            })
            return mapSteps
        }
    },
    getStepsOptsWithoutAll(state) {
        if (state.steps) {
            const mapSteps = state.steps.map(step => {
                return {
                    step_id: step.id,
                    text: step.step_nm
                }
            })
            return mapSteps
        }
    }
};

const actions = {
    [GET_STEPS]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("master/steps/get", query)
                .then((result) => {
                    const steps = result.data
                    if (steps) {
                        commit(SET_STEPS, steps.data)
                        resolve(steps.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_STEP]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/steps/add', data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_STEP]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/steps/edit/${ID}`, data)
                .then((result) => {
                    const step = result.data
                    resolve(step.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_STEP]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/steps/delete/${id}`)
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
    [SET_STEPS](state, steps) {
        state.steps = steps;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};