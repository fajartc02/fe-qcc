import ApiService from "../api.service";

// action
export const GET_JOB = "getJob";
export const POST_JOB = "postJob";
export const PUT_JOB = "putJob";
export const DELETE_JOB = "deleteJob";

// mutation types
export const SET_JOB = "setJob";


const state = {
    jobData: []
};

const getters = {
    jobData(state) {
        return state.jobData
    },
    getJobOpts(state) {
        if (state.jobData) {
            const mapJob = state.jobData.map(job => {
                return {
                    id: job.id,
                    text: `${job.job_no}-${job.job_nm}`
                }
            })
            return mapJob
        }
    },
    getJobsTreeselect(state) {
        if (state.jobData) {
            const mapJobs = state.jobData.map(job => {
                return {
                    id: job.id,
                    label: `${job.job_no}-${job.job_nm}`
                }
            })
            return mapJobs
        }
    }
};

const actions = {
    [GET_JOB]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query('master/job', query)
                .then((result) => {
                    const jobData = result.data
                    if (jobData) {
                        commit(SET_JOB, jobData.data)
                        resolve(jobData.data)
                    }
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_JOB]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/job', data)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_JOB]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/job/${ID}`, data.formData)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_JOB]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/job/${id}`)
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
    [SET_JOB](state, payload) {
        state.jobData = payload;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};