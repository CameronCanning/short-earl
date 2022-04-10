import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
const axios = require('axios');


const Redirect = () => {
    const [loading, setLoading] = useState(true);
    const { earl } = useParams();

    axios.get(`http://localhost:5000/short/${earl}`)
    .then( (res) => {
        console.log(res.data.long);
    });

    return (
        !loading &&
        <p>Short Earl is Redirecting You...</p>
    )
}
export default Redirect;