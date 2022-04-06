import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { validateAlias, validateURL } from '../services/validateURL.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFish } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/react-fontawesome';
const axios = require('axios');


const Short = () => {
    const [form, setForm] = useState({
        long: '',
        short: '',
    });
    const [validated, setValidated] = useState({
        short: '',
        shortMessage: '',
        long: '',
        longMessage: ''
    });

    const [complete, setComplete] = useState(false);


    const baseURL = 'https://shortearl.com/';


    let navigate = useNavigate();

    const updateForm = (value) => {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    };
    const updateValidated = (value) => {
        return setValidated((prev) => {
            return {...prev, ...value}
        })
    };

    const onSubmit = async (e) => { 
        e.preventDefault();
        
        const newEarl = {...form};

        //Validate form
        let abort = false;
        if (form.long == ''){
            updateValidated({long: 'is-invalid', longMessage: 'Required'});
            abort = true;
        }
        else if (!validateURL(newEarl.long)){
            updateValidated({long: 'is-invalid', longMessage: 'Invalid URL'});
            abort = true;
        }
        else updateValidated({long: '', longMessage: ''});

        if (form.short && !validateAlias(newEarl.short)){          
            updateValidated({
                short: 'is-invalid',
                shortMessage: 'Must be 3-20 characters using only Aa-Zz, 0-9, -, _'});        
            abort = true;
        }
        else updateValidated({short: ''});

        if (abort) return;

        axios.post('http://localhost:5000/short/add', newEarl)
        .then( (res) => {
            if (res.data.status == 'success'){
                updateForm({
                    long: form.long,
                    short: baseURL + res.data.earl,
                });
                setComplete(true);
            }
            else if (res.data.status == 'earl_taken'){
                updateValidated({
                    short: 'is-invalid',
                    shortMessage: 'Alias is taken'});
            }
                
        })
        .catch(error => {
            window.alert(error);
            return;
        });
    }

    return(
        
        <div class='border main mt-3'> 
        <form onSubmit={onSubmit} class = 'needs-validation' novalidate >           
            <div class='form-group p-2'>
                
                <label for='long'>
                    <i class="bi bi-link-45deg" style={{fontSize: '1.3rem'}}></i>
                    <FontAwesomeIcon icon={faFish} />
                    <FontAwesomeIcon icon='coffee' />
                    {complete ? ' Your long URL'  : ' Paste your URL'}
                </label>
                <input                 
                    readOnly={complete}
                    type='text'
                    className={'form-control form-control-lg ' + validated.long}
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ long: e.target.value }) }/>
                    <div class="invalid-feedback">{validated.longMessage}</div> 
            </div>
            <div class='form-group p-2'>
                <label for='short'>
                    <i class="bi bi-magic" style={{fontSize: '1.1rem'}}></i>
                    { complete ? ' short-earl' : ' Customize your link (optional)' }
                </label>
                <div class='input-group input-group-lg has-validation'>
                    {!complete && 
                        <span class="input-group-text" id="basic-addon1">{baseURL}</span>
                    }
                    <input 
                        readOnly={complete}
                        type='text'
                        className={'form-control form-control-lg ' + validated.short}
                        id='short'
                        value={form.short}
                        onChange={ (e) => updateForm({ short: e.target.value }) }/>  
                        {complete &&
                            <button class="btn btn-outline-secondary" type="button" >
                                Copy
                            </button>
                        }
                        <div class="invalid-feedback">{validated.shortMessage}</div>     
                                                                                                             
                </div>                
            </div>
            <div className='form-group p-2'>
                {complete                     
                    ? <button type='button' className='btn btn-dark btn-lg'>Shorten Another</button>
                    : <button type='submit' className='btn btn-dark btn-lg'>Shorten URL</button>}                
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