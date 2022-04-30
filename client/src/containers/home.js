import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';
import Earl from '../components/earl';

const Home = () => {
    return(
        <Layout>
            <div parentclass='bg-white py-3 my-2' className='d-flex justify-content-between flex-column-reverse flex-md-row '>
                <div className='d-flex flex-shrink-0 my-auto '>
                    <span className='display fw-bold'>Welcome to short earl
                        <p className='text-muted fs-4 fw-light'>A beautifully simple URL shortener </p>
                    </span>
                </div>
                <div>
                    <img src={require('../assets/images/earl_home.jpeg')}/>
                </div>
            </div>
            <Earl parentclass='bg-main flex-grow-1'/>     
        </Layout>
    )
}

export default Home;