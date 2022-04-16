import React, { useState } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navbar";
import Redirect from './components/redirect';
import Broken from './containers/broken';
import Home from './containers/home';

const App = () => {
    const [showEarls, setShowEarls] = useState(false);
    return (
        <div>
            <Routes>     
                <Route path=':earl' element={<Redirect/>}/>         
                <Route path='/' element={<Home/>}/>  
                <Route path='layout' element={<Broken/>}/>
            </Routes>
        </div>
    )
}

export default App;
