import { useState } from 'react';
import { Form, Card, Button} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { validateSignup } from '../services/validateSignup';
import api from '../services/api';

const SignupForm = () => {

    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password1: '',
        password2: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        password1: '',
        password2: ''
    });
    const updateForm = (e) => {
        setErrors((prev) => {
            return {...prev, [e.target.name]: ''}
        });
        return setForm((prev) => {
            return {...prev, [e.target.name]: e.target.value}
        });
    };

    
    const onSubmit = (e) => {
        e.preventDefault();

        const newForm = {...form};
        let newErrors = validateSignup(newForm);
        
        
        if (newErrors.email || newErrors.password1 || newErrors.password2){
            return setErrors(newErrors);
        }
        api.register({email: newForm.email, password: newForm.password1})
        .then((res) => {
            navigate('/app');
        })
        .catch(err => {
            setErrors(prev => {return {...prev, email: err.response.data}});
        })
    };
    return (
        <Card className='p-3'>
            <h3 className='pb-3'>Create Account</h3>
            <Form noValidate  onSubmit={onSubmit}>
                <Form.Group className='mb-3' >
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    required
                    value={form.email}
                    onChange={updateForm}
                    isInvalid={!!errors.email}
                    type='email'
                    name='email'                        
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        required
                        value={form.password1}
                        onChange={updateForm}
                        isInvalid={!!errors.password1}
                        name='password1'
                        type="password"
                        id="inputPassword1"
                        aria-describedby="passwordHelpBlock"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password1}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mb-3' required>
                    <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
                    <Form.Control
                        required
                        value={form.password2}
                        onChange={updateForm}
                        isInvalid={!!errors.password2}
                        name='password2'
                        type="password"
                        id="inputPassword2"
                        aria-describedby="passwordHelpBlock"
                        feedback="Error"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password2}</Form.Control.Feedback>
                </Form.Group>
                <div className='d-grid gap-3 mx-auto pt-3'>
                    <Button className='' variant='primary' type='submit'>Sign up</Button>
                    <NavLink className='mx-auto' to='/app/login'>Log in</NavLink>
                </div>
            </Form>
        </Card>
    )
}

export default SignupForm;