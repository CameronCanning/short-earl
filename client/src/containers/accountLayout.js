import { Container, Card } from 'react-bootstrap';
import LoginForm from '../components/loginform'
import { NavLink } from 'react-router-dom';
const AccountLayout = ({ children }) => {
    return(
        <Container fluid className='d-flex justify-content-center container-sm'>
            <div className='account flex-grow-1'>
                <div className='text-center py-3'>
                        <NavLink to='/' className='navbar-brand h1 text-secondary'>short earl</NavLink>
                </div>
                {children}
            </div>
        </Container>

        
        
    )
}

export default AccountLayout;