import { useState } from 'react';
import { Form, Card, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const LoginForm = () => {

    const [form, setForm] = useState({
        email: '',
        password1: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password1: '',
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
        alert('login');
    };
    return (
        <Card className='p-3'>
            <h3 className='pb-3'>Log in</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        placeholder='name@example.com'
                        required
                        value={form.email}
                        onChange={updateForm}
                        isInvalid={!!errors.email}
                        type='email'
                        name='email'>

                    </Form.Control>
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
                    <Form.Text id="passwordHelpBlock" muted>

                    </Form.Text>
                </Form.Group>
                <div className='d-grid gap-3 mx-auto pt-3'>
                    <Button className='' variant='primary' type='submit'>Log in</Button>
                    <NavLink className='mx-auto' to='/app/signup'>Create an Account</NavLink>
                </div>
            </Form>
        </Card>
    )
}

export default LoginForm;