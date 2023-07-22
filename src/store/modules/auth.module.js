import ApiService from "@/store/api.service";
import JwtService from "@/store/jwt.service";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const REGISTER = "register";
export const UPDATE_PASSWORD = "updateUser";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_PASSWORD = "setPassword";
export const SET_ERROR = "setError";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!JwtService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("login", credentials)
                .then(({ data }) => {

                    context.commit(SET_AUTH, data.data);
                    resolve(data.data);
                })
                .catch(({ response }) => {
                    reject(response)
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [REGISTER](context, credentials) {
        return new Promise(resolve => {
            ApiService.post("login", credentials)
                .then(({ data }) => {
                    context.commit(SET_AUTH, data);
                    resolve(data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        });
    },
    [VERIFY_AUTH](context) {
        console.log('verify auth');

        if (JwtService.getToken()) {
            ApiService.setHeader();
            ApiService.get("verify")
                .then(({ data }) => {
                    console.log(data);

                    // context.commit(SET_AUTH, data);
                })
                .catch(({ response }) => {
                    context.commit(SET_ERROR, response.data.status);
                    return response.status
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    },
    [UPDATE_PASSWORD](context, payload) {
        const password = payload;

        return ApiService.put("password", password).then(({ data }) => {
            context.commit(SET_PASSWORD, data);
            return data;
        });
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        console.log(user);
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        state.name = user.data.fullname
        localStorage.setItem('user', state.name)
        localStorage.setItem('group_id', user.data.group_id)
        localStorage.setItem('line_id', user.data.line_id)
        localStorage.setItem('is_admin', user.data.is_admin)
        JwtService.saveToken(state.user.token);
    },
    [SET_PASSWORD](state, password) {
        state.user.password = password;
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        localStorage.removeItem('user')
        localStorage.removeItem('group_id')
        localStorage.removeItem('line_id')
        localStorage.removeItem('is_admin')
        JwtService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};