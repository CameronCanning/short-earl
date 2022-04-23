import React, { useState } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import Redirect from './components/redirect';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <div>
            <AuthProvider>
                <Routes>     
                    <Route path=':earl' element={<Redirect/>}/>   
                    <Route path='/' element={<Navigate to='/app'/>}/>        
                    <Route path='/app' element={<Home/>}/>  
                    <Route path='/app/login' element={<Login/>}/>
                    <Route path='/app/signup' element={<Signup/>}/>
                </Routes>
            </AuthProvider>
        </div>
    )
}

export default App;
