import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Earl from '../components/earl';
import NavBar from '../components/navbar';

const Home = () => {
    return(
        <Container fluid className=''>
            <Row className='bg-dark'>
                <div className='main'>
                    <NavBar/>
                </div>
            </Row>
            <Row className=''>
                <Row className='main'>
                        <Col className='d-flex align-items-center p-0'>
                            <h1 className='display-1'>Short links, big results</h1>
                        </Col>
                        <Col className='p-0'>
                            <img src={require('../assets/images/bitly.png')}/>
                        </Col>
                </Row>
            </Row>
            <Row className='bg-primary'>
                <Earl className='main'/>
                
            </Row> 
            <Row>

            </Row>       
        </Container>
    )
}

export default Home;
                    
