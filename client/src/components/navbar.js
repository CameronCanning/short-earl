import React, {useContext} from 'react';
import { NavLink } from "react-router-dom";
import AuthContext from '../context/AuthContext';
import api from '../services/api';
export default function NavBar() {
    const {authenticated, updateAuthenticated, loading} = useContext(AuthContext);
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className='container-fluid ps-0 pe-0'>
                    <NavLink className="navbar-brand mb-0 me-0 h1" to="/app">short earl</NavLink>
                    <button
                        className="navbar-toggler shadow-none border-0 p-0"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarToggleExternalContent"
                        aria-controls="navbarToggleExternalContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end me-0 navbar-nav" id="navbarText">  
                        {!loading && authenticated ? 
                            <>
                            <button type='button' className='nav-link btn' onClick={async () => {
                                await api.logout();
                                updateAuthenticated()
                            }}>                                       
                                Log out
                            </button> 
                            </>                            
                            :
                            <>
                            <NavLink to='/app/signup' as='a' className='nav-link'>                                       
                                Sign up
                            </NavLink> 
                            <NavLink to='/app/login' as='a' className='nav-link'>                                       
                                Log in
                            </NavLink> 
                            </>
                            }
                    </div>
                </div>   
            </nav>   
            <div className="collapse" id="navbarToggleExternalContent">  
                <div >
                    <div className='border-top p-2 ps-0'>
                        <NavLink className='nav-link link-light ps-0' to='/app'>Home</NavLink>
                        <NavLink className='nav-link link-light ps-0' to='/app'>My Earls</NavLink>
                        <NavLink className='nav-link link-light ps-0' to='/login'>Log in</NavLink>
                        <NavLink className='nav-link link-light ps-0' to='/signup'>Sign up</NavLink>
                    </div>
                    
                </div>
            </div>      
        </div>
    )}
