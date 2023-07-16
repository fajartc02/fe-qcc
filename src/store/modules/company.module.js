import ApiService from "@/store/api.service";
export const GET_COMPANY = "getCompaniesStore";
export const POST_COMPANY = "postCompanies";
export const PUT_COMPANY = "putCompanies";
export const DELETE_COMPANY = "deleteCompanies";

// mutation types
export const SET_COMPANY = "setCompanies";

const state = {
    companies: null
};

const getters = {
    getCompanies(state) {
        return state.companies
    },
    getCompaniesOpts(state) {
        if (state.companies) {
            const mapCompanies = state.companies.map(company => {
                return {
                    id: company.id,
                    text: company.company_nm
                }
            })
            mapCompanies.push({
                id: "-1",
                text: 'All'
            })
            return mapCompanies
        }
    },
    getCompaniesOptsWithoutAll(state) {
        if (state.companies) {
            const mapCompanies = state.companies.map(company => {
                return {
                    id: company.id,
                    text: company.company_nm
                }
            })
            return mapCompanies
        }
    }
};

const actions = {
    [GET_COMPANY]({ commit }) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.get("master/companies")
                .then((result) => {
                    const companies = result.data
                    if (companies) {
                        commit(SET_COMPANY, companies.data)
                        resolve(companies.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_COMPANY]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/companies', data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_COMPANY]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/companies/edit/${ID}`, data.formData)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_COMPANY]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/companies/delete/${id}`)
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
    [SET_COMPANY](state, companies) {
        state.companies = companies;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};