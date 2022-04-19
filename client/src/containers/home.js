import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Layout from './layout';
import Earl from '../components/earl';

const Home = () => {
    return(
        <Layout>
            <div className='d-flex justify-content-between flex-column-reverse flex-md-row'>
                <div className='d-flex flex-shrink-0 my-auto'>
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
            <Earl parentclass='bg-primary'/>     
        </Layout>
    )
}

export default Home;
                    
/** 
                <div className='d-flex flex-lg-column my-auto flex-shrink-0'>
                    <h1 className='display-1'>Short links,</h1>
                    <h1 className='display-1 ps-3'>big results</h1>
                </div>
                */