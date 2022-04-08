import React, { useState } from 'react';
//import { useNavigate } from 'react-router';
import { validateEarl, INVALID } from '../services/validateEarl.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
const axios = require('axios');


const Short = () => {
    const [form, setForm] = useState({
        long: '',
        short: '',
    });
    const [validation, setValidation] = useState({
        long: {
            status: '',
            error: ''
        },
        short: {
            status: '',
            error: ''
        }        
    });

    const [complete, setComplete] = useState(false);


    const DOMAIN = 'https://shortearl.com/';

    const updateForm = (value) => {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    };

    const onSubmit = (e) => { 
        e.preventDefault();
        
        const newEarl = {...form};
        let newValidation = validateEarl(newEarl);
        setValidation(newValidation);
        if (newValidation.short.status == INVALID || newValidation.long.status == INVALID) return;

        axios.post('http://localhost:5000/short/add', newEarl)
        .then( (res) => {
            if (res.data.status == 'success'){
                updateForm({
                    long: form.long,
                    short: DOMAIN + res.data.earl,
                });
                setComplete(true);
            }
            else if (res.data.status == 'earl_taken'){
                setValidation( (prev) => {
                    return { 
                        ...prev,
                        short: {
                            status: 'is-invalid',
                            error: 'Alias is taken'
                        }
                    }});
            }
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    }

    return(
        
        <div className='border main mt-3'> 
        <form onSubmit={onSubmit} className = 'needs-validation' noValidate>           
            <div className='form-group p-2'>
                
                <label htmlFor='long'>
                    <i className="bi bi-link-45deg" style={{fontSize: '1.3rem'}}></i>
                    {complete ? ' Your long URL'  : ' Paste your URL'}
                </label>
                <input                 
                    readOnly={complete}
                    type='text'
                    className={'form-control form-control-lg ' + validation.long.status}
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ long: e.target.value }) }/>
                    <div className="invalid-feedback">{validation.long.error}</div> 
            </div>
            <div className='form-group p-2'>
                <label htmlFor='short'>
                    <i className="bi bi-magic" style={{fontSize: '1.1rem'}}></i>
                    { complete ? ' short-earl' : ' Customize your link (optional)' }
                </label>
                <div className='input-group input-group-lg has-validation'>
                    {!complete && 
                        <span className="input-group-text" id="basic-addon1">{DOMAIN}</span>
                    }
                    <input 
                        readOnly={complete}
                        type='text'
                        className={'form-control form-control-lg ' + validation.short.status}
                        id='short'
                        value={form.short}
                        onChange={ (e) => updateForm({ short: e.target.value }) }/>  
                        {complete &&
                            <button className="btn btn-dark" type="button" onClick={() => {navigator.clipboard.writeText(form.short)}}>
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                        }
                        <div className="invalid-feedback">{validation.short.error}</div>     
                                                                                                             
                </div>                
            </div>
            <div className='form-group p-2 d-grid gap-2'>
                {complete                     
                    ? [<button type='button' key='1' className='btn btn-dark btn-lg btn-block'>Shorten Another</button>,
                       <button type='button' key='2' className='btn btn-outline-dark btn-lg '>My Earls</button>]
                    :  <button type='submit' className='btn btn-dark btn-lg btn-block'>Shorten URL</button>}                
            </div>
        </form>        
        </div>
        
    )
}
export default Short;

/**
 * change form onSubmit
 * input readonly:
 *      change input updates to null
 *      change buttons     
 *      
 */