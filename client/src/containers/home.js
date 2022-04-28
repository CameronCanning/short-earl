import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';
import Earl from '../components/earl';

const Home = () => {
    return(
        <Layout className=''>
            <div parentclass='bg-white py-3' className='d-flex justify-content-between flex-column-reverse flex-md-row '>
                <div className='d-flex flex-shrink-0 my-auto '>
                    <span className='display fw-bold'>
                        Short links, 
                        <br/>
                        big results
                        <br/>
                    </span>
                </div>
                <div>
                    <img src={require('../assets/images/bitly.png')}/>
                </div>
            </div>
            <Earl parentclass='bg-main flex-grow-1'/>     
        </Layout>
    )
}

export default Home;