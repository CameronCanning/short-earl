import React from 'react';
import Layout from './layout';

const Broken = () => {
    return(
        <Layout footerClass='bg-dark'>
            <div parentclass='bg-white py-3 my-2' className='d-flex justify-content-between flex-column-reverse flex-md-row '>
                <div className='d-flex flex-shrink-0 my-auto '>
                    <span className='display fw-bold'>Oops
                        <p className='text-muted fs-4 fw-light'>That link doesn't exist</p>
                    </span>
                </div>
                <div>
                    <img src={require('../assets/images/earl_broken.png')}/>
                </div>
            </div>
        </Layout>
    )
}

export default Broken;