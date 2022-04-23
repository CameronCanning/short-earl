const axios = require('axios');

let baseURL = 'https://short-earl-api.herokuapp.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    baseURL = 'http://localhost:5000';
}

export default api = {
    auth: () => {
        return axios.get(`${baseURL}/user/auth`);
    },
    //payload: {email, password}
    register: (payload) => {
        return axios.post(`${baseURL}/user/register`, payload);
    },
    //payload: {email, password}
    login: (payload) => {
        return axios.post(`${baseURL}/user/login`, payload);
    },
    logout: () => {
        return axios.delete(`${baseURL}/user/logout`);
    },
    getEarls: () => {
        return axios.get(`${baseURL}/user/earls`);
    },
    //id: earl id
    getEarl: (id) => {
        return axios.get(`${baseURL}/earl/${id}`);
    },
    //payload: {_id, url}
    createEarl: (payload) => {
        return axios.post(`${baseURL}/earl/create`, payload);
    }
}