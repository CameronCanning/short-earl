import React from 'react';
import { Stack, Row, Container } from 'react-bootstrap';
import NavBar from '../components/navbar';

const Layout = ({children}) => {
    return(
        <Stack gap={3}>
            <Container fluid className='bg-dark'>
                <div className='main'>
                    <NavBar/> 
                </div> 
            </Container>
                     
            {React.Children.map(children, (child, i) => {
                return(
                    <Container fluid className={child.props.className} key={i}>
                            <div className='main'>
                                {child}  
                            </div>
                    </Container>)
            })}    
        </Stack>
    )
}

export default Layout;
                    