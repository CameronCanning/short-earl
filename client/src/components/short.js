import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { validateAlias, validateURL } from '../services/validateURL.js'
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
    });


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
        let abort = false;
        if (!validateURL(newEarl.long)){
            updateValidated({long: 'is-invalid'})
            abort = true;
        }
        else updateValidated({long: ''});

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
                //do nav to final card
                setForm({...form, short: res.data.earl});
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
        <div class='shadow-sm' style={{maxWidth: '360px', margin: '0 auto', float: 'none'}}>
        <form onSubmit={onSubmit} class = 'needs-validation' novalidate>
            <div class='form-group p-2'>
                <label for='long'>Paste your URL</label>
                <input 
                    type='text'
                    className={'form-control form-control-lg ' + validated.long}
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ long: e.target.value }) }/>
                    <span class="invalid-feedback">Invalid URL</span> 
            </div>
            <div class='form-group p-2'>
                <label for='short'>Customize your link (optional)</label>
                <div class='input-group input-group-lg has-validation'>
                    <span class="input-group-text" id="basic-addon1">https://shortearl.com/</span>
                    <input 
                        type='text'
                        className={'form-control form-control-lg ' + validated.short}
                        id='short'
                        value={form.short}
                        aria-describedby="basic-addon2"
                        onChange={ (e) => updateForm({ short: e.target.value }) }/>    
                        <div class="invalid-feedback">{validated.shortMessage}</div>                                                                                          
                </div>                
            </div>
            <div className='form-group p-2'>
                <input
                    type='submit'
                    value='Shorten URL'
                    className='btn btn-dark'/>
            </div>
        </form>        
        </div>
        
    )
}
export default Short;