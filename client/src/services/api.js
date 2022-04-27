const axios = require('axios');

const options = {
    withCredentials: true,
}
export default {
    //res.data: bool
    auth: () => {
        return axios.get(`user/auth`, options);
    },
    //payload: {email, password}
    register: (payload) => {
        return axios.post(`/user/register`, payload, options);
    },
    //payload: {email, password}
    login: (payload) => {
        return axios.post(`/user/login`, payload, options);
    },
    logout: async () => {
        return axios.delete(`/user/logout`, options);
    },
    getEarls: () => {
        return axios.get(`/user/earls`, options);
    },
    //id: earl id
    getEarl: (id) => {
        return axios.get(`/earl/${id}`);
    },
    //payload: {_id, url}
    createEarl: (payload) => {
        return axios.post(`/earl/create`, payload, options);
    }
}