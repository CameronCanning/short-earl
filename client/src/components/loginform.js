import { Form, Card, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
const LoginForm = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        alert('login');
    };
    return (
        <Card className='p-3'>
            <h3 className='mb-3'>Log in</h3>
            <Form onSubmit={onSubmit}>
                <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder='name@example.com'></Form.Control>
                </Form.Group>
                <Form.Group className='mb-3'>
                    <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword5"
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