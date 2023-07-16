import axios from "axios";
// 
import JwtService from "@/store/jwt.service";

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    init() {
        axios.defaults.baseURL = process.env.VUE_APP_URL;
    },

    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${JwtService.getToken()}`;
    },

    async query(resource, params) {
        let container = []
        let query = `?`
        for (const key in params) {
            if (params[key]) container.push(`${key}=${params[key]}`);
        }
        query += container.join('&')
        return axios.get(resource + query).catch(error => {
            return error
        });
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @returns {*}
     */
    get(resource, slug = "") {
        return axios.get(`${resource}/${slug}`).catch(error => {
            // console.log(error);
            return error;
            // throw new Error(`[KT] ApiService ${error}`);
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params = null) {
        console.log(resource);
        return axios.post(`${resource}`, params);
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        return axios.put(`${resource}/${slug}`, params);
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return axios.put(`${resource}`, params);
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource) {
        return axios.delete(resource).catch(error => {
            console.log(error);
            return error;
            // throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default ApiService;