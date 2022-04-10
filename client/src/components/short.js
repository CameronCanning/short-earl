import React, { useState, useRef, useEffect } from 'react';
import { validateEarl, INVALID } from '../services/validateEarl.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Tooltip, Overlay } from 'react-bootstrap';
const axios = require('axios');


const Short = () => {
    useEffect( () => {

    });

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
    const [showTooltip, setShowTooltip] = useState(false);
    const target = useRef(null);
    
    const DOMAIN = 'https://shortearl.com/';

    const setValidationByName = (formName, {_status, _error} = {}) => {
        setValidation((prev) => {
            return {...prev, [formName]: {status: _status, error: _error}}
        });
    }

    const resetForm = () => {
        setForm({long: '', short: ''});
        setComplete(false);
    }

    const updateForm = ({field, value}) => {
        if (!value) {
            setValidationByName(field);
        }
        return setForm((prev) => {
            return {...prev, [field]: value}
        })
    };

    const onSubmit = (e) => { 
        e.preventDefault();
        
        const newEarl = {...form};
        let newValidation = validateEarl(newEarl);
        setValidation(newValidation);
        if (newValidation.long.status === INVALID || newValidation.short.status === INVALID) return;

        axios.post('http://localhost:5000/short/add', newEarl)
        .then( (res) => {
            if (res.data.status === 'success'){
                console.log('suc');
                updateForm({
                    long: form.long,
                    short: DOMAIN + res.data.earl,
                });
                setComplete(true);
            }
            else if (res.data.status === 'earl_taken'){
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
        
        <div className='main border rounded-3 mt-3'> 
        <form onSubmit={onSubmit} className='needs-validation' noValidate>      
            <div className='form-group p-2'>
                <label htmlFor='long'>
                    <i className="bi bi-link-45deg" style={{fontSize: '1.3rem'}}></i>
                    {complete ? ' Your long URL'  : ' Paste your URL'}
                </label>
                <input                 
                    readOnly={complete}
                    type='text'
                    className={`form-control form-control-lg bg-white ${validation.long.status}`}
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ field: 'long', value: e.target.value }) }/>
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
                        className={`form-control form-control-lg bg-white ${validation.short.status}`}
                        id='short'
                        value={form.short}
                        onChange={ (e) => updateForm({ field: 'short', value: e.target.value }) }/>  
                        {complete &&
                            <>
                            <button 
                                className="btn btn-dark" 
                                type="button" 
                                onClick={() => {
                                    navigator.clipboard.writeText(form.short);
                                    setShowTooltip(true);
                                    setTimeout(() => {
                                        target.current.blur(); 
                                        setShowTooltip(false);                                                 
                                    }, 1500);
                                    }}
                                ref={target}
                            >
                                <FontAwesomeIcon icon={faCopy} />
                            </button>
                            <Overlay target={target.current} show={showTooltip} placement="top">
                                {(props) => (
                                    <Tooltip id="copy-tt" {...props}>
                                        Copied
                                    </Tooltip>
                                )}
                            </Overlay> 
                            </>
                        }
                        <div className="invalid-feedback">{validation.short.error}</div>                                                                            
                </div>                
            </div>
            <div className='p-2 pt-3 d-grid gap-3 col-12 mx-auto '>
            {complete 
                ? 
                <>
                <button 
                    type='button' 
                    key='1' 
                    className='btn btn-dark btn-lg' 
                    onClick={resetForm}>
                    Shorten Another
                </button>
                <button type='button' key='2' className='btn btn-outline-dark btn-lg'>My Earls</button>
                </>
                :
                <button type='submit' className='btn btn-dark btn-lg'>Shorten URL</button>}     
            </div>
        </form>        
        </div>
        
    )
}
export default Short;
