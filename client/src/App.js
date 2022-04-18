import React, { useState } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import NavBar from "./components/navbar";
import Redirect from './components/redirect';
import Broken from './containers/broken';
import Home from './containers/home';
import AccountLayout from './containers/accountLayout';
import Login from './containers/login';
import Signup from './containers/signup';
const App = () => {
    const [showEarls, setShowEarls] = useState(false);
    return (
        <div>
            <Routes>     
                <Route path=':earl' element={<Redirect/>}/>   
                <Route path='/' element={<Navigate to='/app'/>}/>        
                <Route path='/app' element={<Home/>}/>  
                <Route path='/app/login' element={<Login/>}/>
                <Route path='/app/signup' element={<Signup/>}/>
            </Routes>
        </div>
    )
}

export default App;
