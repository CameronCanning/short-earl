import React from 'react';
import { Stack, Row, Container } from 'react-bootstrap';
import NavBar from '../components/navbar';

const Layout = ({children, gap=5}) => {
    return(
        <Stack gap={gap}>
            <Container fluid className='bg-dark'>
                <div className='main'>
                    <NavBar/> 
                </div> 
            </Container>
                     
            {React.Children.map(children, (child, i) => {
                return(
                    <Container fluid key={i} className={child.props.parentclass}>
                            <div className='main'>
                                {child}  
                            </div>
                    </Container>)
            })}    
        </Stack>
    )
}

export default Layout;
                    