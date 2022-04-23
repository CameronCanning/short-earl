const axios = require('axios');

let baseURL = 'https://short-earl-api.herokuapp.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    baseURL = 'http://localhost:5000';
}

const options = {
    withCredentials: true
}
export default {
    //res.data: bool
    auth: () => {
        return axios.get(`${baseURL}/user/auth`, options);
    },
    //payload: {email, password}
    register: (payload) => {
        return axios.post(`${baseURL}/user/register`, payload, options);
    },
    //payload: {email, password}
    login: (payload) => {
        return axios.post(`${baseURL}/user/login`, payload, options);
    },
    logout: () => {
        return axios.delete(`${baseURL}/user/logout`, options);
    },
    getEarls: () => {
        return axios.get(`${baseURL}/user/earls`, options);
    },
    //id: earl id
    getEarl: (id) => {
        return axios.get(`${baseURL}/earl/${id}`);
    },
    //payload: {_id, url}
    createEarl: (payload) => {
        return axios.post(`${baseURL}/earl/create`, payload, options);
    }
}