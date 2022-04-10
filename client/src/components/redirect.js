import React, { useEffect } from 'react';
import { useParams} from 'react-router-dom';
const axios = require('axios');


const Redirect = () => {
    let { earl } = useParams();
    const lookupRedirect = async () => {
        const res = await axios.get('http://localhost:5000/short/'+earl);
        console.log(res.data.long);    
        if (res) window.location.href = res.data.long;
    }    
    lookupRedirect();
    return <p>Short Earl is Redirecting You...</p>
}
export default Redirect;