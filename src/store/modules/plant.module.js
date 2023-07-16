import ApiService from "@/store/api.service";
export const GET_PLANTS = "getPlantsStore";
export const POST_PLANT = "postPlants";
export const PUT_PLANT = "putPlants";
export const DELETE_PLANT = "deletePlants";

// mutation types
export const SET_PLANTS = "setPlants";

const state = {
    plants: null
};

const getters = {
    getPlants(state) {
        return state.plants
    },
    getPlantsOpts(state) {
        if (state.plants) {
            const mapPlants = state.plants.map(plant => {
                return {
                    id: plant.id,
                    text: plant.plant_nm
                }
            })
            mapPlants.push({
                id: "-1",
                text: 'All'
            })
            return mapPlants
        }
    },
    getPlantsOptsWithoutAll(state) {
        if (state.plants) {
            const mapPlants = state.plants.map(plant => {
                return {
                    id: plant.id,
                    text: plant.plant_nm
                }
            })
            return mapPlants
        }
    }
};

const actions = {
    [GET_PLANTS]({ commit }) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.get("master/plants")
                .then((result) => {
                    const plants = result.data
                    if (plants) {
                        commit(SET_PLANTS, plants.data)
                        resolve(plants.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [POST_PLANT]({ commit }, data = null) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.post('master/plants', data)
                .then((result) => {
                    const linesData = result.data
                    resolve(linesData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [PUT_PLANT]({ commit }, data = null) {
        ApiService.setHeader()
        let ID = data.id
        delete data.id
        return new Promise((resolve, reject) => {
            console.log(data);
            ApiService.put(`master/plants/edit/${ID}`, data.formData)
                .then((result) => {
                    const jobData = result.data
                    resolve(jobData.data)
                    console.log(commit);
                }).catch((err) => {
                    reject(err)
                });

        });
    },
    [DELETE_PLANT]({ commit }, id) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.delete(`master/plants/delete/${id}`)
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
    [SET_PLANTS](state, plants) {
        state.plants = plants;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};