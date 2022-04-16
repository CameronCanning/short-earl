import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';
import Earl from '../components/earl';

const Home = () => {
    return(
        <Layout>
            <div className='d-flex align-items-stretch justify-content-between'>
                <div className='d-flex flex-column m-auto p-3'>
                    <h1 className='display-1'>Short links,</h1>
                    <h1 className='display-1'>big results</h1>
                </div>
                <div className='p-3'>
                    <img src={require('../assets/images/bitly.png')}/>
                </div>
            </div>
            <Earl className='bg-primary'/>     
        </Layout>
    )
}

export default Home;
                    
