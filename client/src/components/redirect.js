import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const Redirect = () => {
    const { earl } = useParams();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getEarl(earl)
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