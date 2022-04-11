import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Broken from './broken';
const axios = require('axios');


const Redirect = () => {
    const { earl } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('redirect');
        axios.get(`http://localhost:5000/earl/${earl}`)
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

    return loading ? null : <Broken/>;
}
export default Redirect;