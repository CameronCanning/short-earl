import React, { useState } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navbar";
import Redirect from './components/redirect';
import Earl from "./components/earl";
import Earls from './components/earls';
import Home from './containers/home';

const App = () => {
    const [showEarls, setShowEarls] = useState(false);
    return (
        <div>
            <Routes>     
                <Route path=':earl' element={<Redirect/>}/>         
                <Route path='/' element={<Navigate to='/app'/>}/>
                <Route path='/app' element={<NavBar setShowEarls={setShowEarls}/>}>
                    <Route index element={<Earl showEarls={showEarls} setShowEarls={setShowEarls}/>}/> 
                    <Route path='earls' element={<Earls/>}/>
                </Route>     
                <Route path='layout' element={<Home/>}/>
            </Routes>
        </div>
    )
}

export default App;
