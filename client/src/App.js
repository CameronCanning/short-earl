import React, { useState, useContext, useEffect } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import Redirect from './components/redirect';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import EmptyHome from './containers/emptyHome';
import AuthContext from './context/AuthContext';

const App = () => {
    const { authenticated, updateAuthenticated } = useContext(AuthContext);
    const [loading, setloading] = useState(true);
    useEffect(async () => {
        await updateAuthenticated();
        setloading(false);
    }, []);
    
    if (loading) {
        return (<EmptyHome/>);
    }
    else
    return (
        <div>
                <Routes>     
                    <Route path=':earl' element={<Redirect/>}/>   
                    <Route path='/' element={<Navigate to='/app'/>}/>        
                    <Route path='/app' element={<Home/>}/>  
                    <Route path='/app/login' element={!authenticated ? <Login/> : <Navigate to='/app'/>}/>
                    <Route path='/app/signup' element={!authenticated ? <Signup/> : <Navigate to='/app'/>}/>
                </Routes>
        </div>
    )
}

export default App;
