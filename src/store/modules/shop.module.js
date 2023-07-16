import ApiService from "@/store/api.service";
export const GET_SHOPS = "getShopsStore";
export const POST_SHOP = "postShops";
export const PUT_SHOP = "putShops";
export const DELETE_SHOP = "deleteShops";

// mutation types
export const SET_SHOPS = "setShops";

const state = {
    shops: null
};

const getters = {
    getShops(state) {
        return state.shops
    },
    getShopsOpts(state) {
        if (state.shops) {
            const mapShops = state.shops.map(shop => {
                return {
                    id: shop.id,
                    text: shop.shop_nm
                }
            })
            mapShops.push({
                id: "-1",
                text: 'All'
            })
            return mapShops
        }
    },
    getShopsOptsWithoutAll(state) {
        if (state.shops) {
            const mapShops = state.shops.map(shop => {
                return {
                    id: shop.id,
                    text: shop.shop_nm
                }
            })
            return mapShops
        }
    }
};

const actions = {
    [GET_SHOPS]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("master/shops", query)
                .then((result) => {
                    const shops = result.data
                    if (shops) {
                        commit(SET_SHOPS, shops.data)
                        resolve(shops.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_SHOP]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/shops', data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_SHOP]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/shops/edit/${ID}`, data)
                .then((result) => {
                    const shop = result.data
                    resolve(shop.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_SHOP]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/shops/delete/${id}`)
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
    [SET_SHOPS](state, shops) {
        state.shops = shops;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};