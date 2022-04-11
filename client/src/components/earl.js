import React, { useState, useRef } from 'react';
import { validateEarl, INVALID } from '../services/validateEarl.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Tooltip, Overlay } from 'react-bootstrap';
import { Card } from "react-bootstrap";
import Earls from './earls';
const axios = require('axios');


const Earl = () => {
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
    const [loggedin, setLoggedin] = useState(false);
    const [earls, setEarls] = useState([]);
    
    const target = useRef(null);
    
    const DOMAIN = 'localhost:3000/';

    const setValidationByName = (formName, {status, error}) => {
        setValidation((prev) => {
            return {...prev, [formName]: {status: status, error: error}}
        });
    }

    const resetForm = () => {
        setForm({long: '', short: ''});
        setComplete(false);
    }

    const updateForm = ({field, value}) => {
        setValidationByName(field, {status: '', error: ''});
        return setForm((prev) => {
            return {...prev, [field]: value}
        })
    };

    const onSubmit = (e) => { 
        e.preventDefault();
        
        const newEarl = {...form};
        let newValidation = validateEarl(newEarl);
        
        if (newValidation.long.status === INVALID || newValidation.short.status === INVALID){
            return setValidation(newValidation);
        };

        axios.post('http://localhost:5000/earl/add', newEarl)
        .then( (res) => {
            if (res.data.status === 'success'){
                setForm({
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
        
        //<div className='main border rounded-3 mt-3'> 
        <Card className='main'>
        <form onSubmit={onSubmit} className='needs-validation mb-3' noValidate>      
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
        <Earls/>
        </Card>
        
        
    )
}
export default Earl;