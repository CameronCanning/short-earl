import React, {useEffect} from 'react';

const Broken = () => {

    useEffect(()=>{
        console.log('broken');
    },[]);
    return (
        <div id='main'>
            <p>Page not Found</p>
        </div>
    )
}

export default Broken;