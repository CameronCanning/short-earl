import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const axios = require('axios');
let baseURL = 'https://short-earl-api.herokuapp.com/';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development'){
    baseURL = 'http://localhost:5000/';
}
const Redirect = () => {
    const { earl } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('redirect: ' + `${baseURL}earl/${earl}`);
        axios.get(`${baseURL}earl/${earl}`)
            .then((res) => {
                let url = res.data.url;
                url = url.replace(/^(https?:\/\/)/, '');
                console.log('Redirecting to ' + url);
                window.location.replace(`//${url}`);
            })
            .catch((err) => {
                setLoading(false);
            });
    },[]);

    return loading ? null : <p>damn</p>//<Broken/>;
}
export default Redirect;