import ApiService from "@/store/api.service";
export const GET_JUDGMENT = "getJudgments";

// mutation types
export const SET_JUDGMENT = "setJudgments";

const state = {
    judgments: []
};

const getters = {
    getJudgments(state) {
        return state.judgments
    },
    // getJudgmentsOpts(state) {
    //     if(state.judgments) {
    //         const mapJudgments = state.judgments.map(line => {
    //             return {
    //                 id: line.uuid,
    //                 text: line.line_nm
    //             }
    //         })
    //         mapJudgments.push({
    //             id: "-1",
    //             text: 'All'
    //         })
    //         return mapJudgments
    //     }
    // }
};

const actions = {
    [GET_JUDGMENT]({commit}) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.get("master/judgments")
            .then((result) => {
                const judgments = result.data
                if(judgments) {
                    commit(SET_JUDGMENT, judgments.data)
                    resolve(judgments.data)
                }
                // throw result;
            }).catch((err) => {
                reject(err)
            });
            
        });
    },
};

const mutations = {
    [SET_JUDGMENT](state, judgments) {
        state.judgments = judgments;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};