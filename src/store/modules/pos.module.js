import ApiService from "../api.service";

// action
export const GET_POS = "getPos";
export const POST_POS = "postPos";
export const PUT_POS = "putPos";
export const DELETE_POS = "deletePos";

// mutation types
export const SET_POS = "setPos";


const state = {
    posData: []
};

const getters = {
    posData(state) {
        return state.posData
    },
    getPosOptsWithoutAll(state) {
        if (state.posData) {
            const mapPos = state.posData.map(pos => {
                return {
                    id: pos.id,
                    text: pos.pos_nm
                }
            })
            return mapPos
        }
    },
    getPosOpts(state) {
        if (state.posData) {
            const mapPos = state.posData.map(pos => {
                return {
                    id: pos.id,
                    text: pos.pos_nm
                }
            })
            mapPos.push({
                id: "-1",
                text: 'All'
            })
            return mapPos
        }
    },
};

const actions = {
    [GET_POS]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query('master/pos', query)
                .then((result) => {
                    const posData = result.data
                    if (posData) {
                        commit(SET_POS, posData.data)
                        resolve(posData.data)
                    }
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_POS]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/pos', data)
                .then((result) => {
                    const posData = result.data
                    resolve(posData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_POS]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            ApiService.put(`master/pos/${ID}`, data.formData)
                .then((result) => {
                    const posData = result.data
                    resolve(posData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_POS]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/pos/${id}`)
                .then((result) => {
                    const posData = result.data
                    resolve(posData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    }
};

const mutations = {
    [SET_POS](state, payload) {
        state.posData = payload;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};