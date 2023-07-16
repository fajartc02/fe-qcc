import ApiService from "@/store/api.service";
export const GET_GROUP = "getGroups";

// mutation types
export const SET_USERS = "setGroups";

const state = {
    groups: null
};

const getters = {
    getGroups(state) {
        return state.groups
    },
    getGroupsOpts(state) {
        if (state.groups) {
            const mapGroups = state.groups.map(group => {
                return {
                    id: group.id,
                    text: group.group_nm
                }
            })
            mapGroups.push({
                id: "-1",
                text: 'All'
            })
            return mapGroups
        }
    },
    getGroupsOptsWithoutAll(state) {
        if (state.groups) {
            const mapGroups = state.groups.map(group => {
                return {
                    id: group.id,
                    text: group.group_nm
                }
            })
            return mapGroups
        }
    }
};

const actions = {
    [GET_GROUP]({ commit }, query) {
        ApiService.setHeader()
        return new Promise((resolve, reject) => {
            ApiService.query("master/groups", query)
                .then((result) => {
                    const groups = result.data
                    if (groups) {
                        commit(SET_USERS, groups.data)
                        resolve(groups.data)
                    }
                    // throw result;
                }).catch((err) => {
                    reject(err)
                });

        });
    },
};

const mutations = {
    [SET_USERS](state, groups) {
        state.groups = groups;
    },
};

export default {
    state,
    actions,
    mutations,
    getters
};