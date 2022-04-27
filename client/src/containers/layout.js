import React from 'react';
import { Stack, Container } from 'react-bootstrap';
import NavBar from '../components/navbar';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Layout = ({children, gap=0}) => {
    return(
        <Stack gap={gap} className='h-100'>
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
            <Container fluid className='bg-primary text-center text-secondary'>
                <span > 
                    <a className='font-monospace footer-text'
                        href='https://github.com/cameroncanning'
                        target="_blank" 
                        rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGithub}/> @CameronCanning
                    </a>
                </span>
            </Container>
        </Stack>
    )
}

export default Layout;
                    