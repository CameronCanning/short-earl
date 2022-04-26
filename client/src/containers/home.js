import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';
import Earl from '../components/earl';

const Home = () => {
    return(
        <Layout className=''>
            <div parentclass='bg-white' className='d-flex justify-content-between flex-column-reverse flex-md-row '>
                <div className='d-flex flex-shrink-0 my-auto '>
                    <h1 className='display-4 '>
                        Short links, big results
                        <br/>
                        <small className='text-muted'>word up earl</small>
                    </h1>
                </div>
                <div>
                    <img src={require('../assets/images/bitly.png')}/>
                </div>
            </div>
            <Earl parentclass='bg-primary flex-grow-1'/>     
        </Layout>
    )
}

export default Home;