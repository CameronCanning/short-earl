import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';

const Broken = () => {
    return(
        <Layout>
            <div className='d-flex'>
                <Col className='d-flex align-items-center p-0'>
                    <h1 className='display-1'>Something went wrong?</h1>
                </Col>
            </div> 
        </Layout>
    )
}

export default Broken;