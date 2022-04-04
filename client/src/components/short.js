import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { validateAlias } from '../services/validateURL.js'

const Short = () => {
    const [form, setForm] = useState({
        long: '',
        short: '',
    });

    const updateForm = (value) => {
        return setForm((prev) => {
            return {...prev, ...value}
        })
    };
    
    const onSubmit = async (e) => { 
        e.preventDefault();
        console.log('submit')
        
        const newShort = {...form};

        if (!validateAlias(newShort)){
            window.alert('invalid alias: ' + newShort.short);
            return;
        }
        //TODO: change when user accounts are setup
        

        let res = await fetch('http://localhost:5000/short/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
            },
            body: JSON.stringify(newShort),
        })
        .catch(error => {
            window.alert(error);
            return;
        });

        console.log(res);
        

        setForm({ long: '', short: ''});
    }

    return(
        <div class='shadow-sm' style={{maxWidth: '360px', margin: '0 auto', float: 'none'}}>
        <form onSubmit={onSubmit}>
            <div class='form-group p-2'>
                <label htmlFor='long'>Your URL</label>
                <input 
                    type='text'
                    className='form-control form-control-lg'
                    id='long'
                    value={form.long}
                    onChange={ (e) => updateForm({ long: e.target.value }) }/>
            </div>
            <div class='form-group p-2'>
                <label htmlFor='long'>Customize your link (optional)</label>
                <div class='input-group'>
                    <span class="input-group-text" id="basic-addon1">https://shortearl.com/</span>
                    <input 
                        type='text'
                        className='form-control form-control-lg'
                        id='short'
                        aria-describedby="basic-addon1"
                        value={form.short}
                        onChange={ (e) => updateForm({ short: e.target.value }) }/> 
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