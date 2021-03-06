import React, { useContext, useEffect } from 'react';
import { Route, Routes, Navigate} from "react-router-dom";
import Redirect from './components/redirect';
import Home from './containers/home';
import Login from './containers/login';
import Signup from './containers/signup';
import AuthContext from './context/AuthContext';
import Broken from './containers/broken';

const App = () => {
    const { authenticated, updateAuthenticated, setLoading } = useContext(AuthContext);
    
    useEffect(async () => {
        await updateAuthenticated();
        setLoading(false);
    }, []);
    
    return (
                <Routes>     
                    <Route path=':earl' element={<Redirect/>}/>   
                    <Route path='/' element={<Navigate to='/app'/>}/>        
                    <Route path='/app' element={<Home/>}/>  
                    <Route path='/app/login' element={!authenticated ? <Login/> : <Navigate to='/app'/>}/>
                    <Route path='/app/signup' element={!authenticated ? <Signup/> : <Navigate to='/app'/>}/>
                    <Route path='/*' element={<Broken/>}/>
                </Routes>
    )
}

export default App;
