import React from 'react';
import Layout from './layout';

const EmptyHome = () => {
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
            <div parentclass='bg-primary'/>     
        </Layout>
    )
}

export default EmptyHome;
                    