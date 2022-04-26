import React, { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext.js';
import { validateEarl, INVALID } from '../services/validateEarl.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { Tooltip, Overlay } from 'react-bootstrap';
import Earls from './earls';
import api from '../services/api';


const Earl = ({className}) => {
    const { authenticated } = useContext(AuthContext);
    useEffect(()=>{
        api.getEarls()
        .then(res => {
            console.log(res.data);
            setEarls(res.data);
        })
        .catch(err => {
            throw err;
        })
    }, [])
    useEffect(()=>{
        if (!authenticated) setEarls([]);
    },[authenticated])

    const [earls, setEarls] = useState([]);
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
        console.log('submit');

        api.createEarl(newEarl)
        .then((res) => {
            setForm({
                long: form.long,
                short: 'short-earl.web.app/' + res.data,
            });
            setComplete(true);
        })
        .catch(err => {
            if (err.resposne.data === 'earl_taken'){
                setValidationByName('short', {status: 'is-invalid', error: 'Alias is taken'});
            }
            else {
                setValidationByName('long', {status: 'is-invalid', error: 'Server error try again later'});
            }
        })
    }

    return(
        <div className={className + ' py-3'} >
        <form onSubmit={onSubmit} className='needs-validation' noValidate>      
            <div className='form-group'>
                <input                 
                    readOnly={complete}
                    autoComplete="off"
                    placeholder='Paste your URL'
                    type='text'
                    className={`form-control form-control-lg bg-white ${validation.long.status}`}
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ field: 'long', value: e.target.value }) }/>
                    <div className="invalid-feedback bg-primary">{validation.long.error}</div> 
            </div>
            <div className='form-group'>
                <div className='input-group input-group-lg has-validation'>
                    {!complete && 
                        <span className="input-group-text" id="basic-addon1">shortearl.com/</span>
                    }
                    <input 
                        readOnly={complete}
                        autoComplete="off"
                        placeholder='Alias (optional)'
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
                                <FontAwesomeIcon className='px-2' icon={faCopy} />
                            </button>
                            <Overlay target={target.current}  show={showTooltip} placement="top">
                                {(props) => (
                                    <Tooltip id="copy-tt" {...props}>
                                        Copied
                                    </Tooltip>
                                )}
                            </Overlay> 
                            </>
                        }
                        <div className="invalid-feedback bg-primary">{validation.short.error}</div>                                                                            
                </div>                
            </div>
            <div className='d-grid gap-3 col-12 mx-auto '>
            {complete 
                ? 
                <button 
                    type='button' 
                    key='1' 
                    className='btn btn-dark btn-lg shorten-button' 
                    onClick={resetForm}>
                    Shorten Another
                </button>
                :
                <button type='submit' key='2'  className='btn btn-dark btn-lg shorten-button'>Shorten URL</button>}     
            </div>
        </form>  
        <Earls earls={earls}/>
        </div>
    )
}
export default Earl;

//<Earls show={showEarls} setShow={setShowEarls}/>