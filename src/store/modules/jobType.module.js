import ApiService from "@/store/api.service";
export const GET_JOB_TYPE = "getJobType";

// mutation types
export const SET_JOB_TYPE = "setJobType";

const state = {
    jobType: null
};

const getters = {
    getJobType(state) {
        return state.jobType
    },
    getJobTypeOpts(state) {
        if (state.jobType) {
            const mapJobType = state.jobType.map(jobType => {
                return {
                    id: jobType.id,
                    text: jobType.job_type_nm
                }
            })
            mapJobType.push({
                id: "-1",
                text: 'All'
            })
            return mapJobType
        }
    },
    getJobTypeOptsWithoutAll(state) {
        if (state.jobType) {
            const mapJobType = state.jobType.map(jobType => {
                return {
                    id: jobType.id,
                    text: jobType.job_type_nm
                }
            })
            return mapJobType
        }
    }
};

const actions = {
    [GET_JOB_TYPE]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("master/jobType", query)
                .then((result) => {
                    const jobType = result.data
                    if (jobType) {
                        commit(SET_JOB_TYPE, jobType.data)
                        resolve(jobType.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
};

const mutations = {
    [SET_JOB_TYPE](state, jobType) {
        state.jobType = jobType;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};