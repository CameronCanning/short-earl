import React from 'react';
import { NavLink, Outlet } from "react-router-dom";

export default function NavBar({setShowEarls}) {
    return (
        <>
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className='container-fluid ps-0 pe-0'>
                    <NavLink className="navbar-brand mb-0 me-0 h1 " to="/">short earl</NavLink>
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
                    <div className="collapse navbar-collapse justify-content-end me-0" id="navbarDropDown">  
                        <NavLink to='/signup'>                                       
                            <button className="btn btn-dark" type="button">Account</button>  
                        </NavLink> 
                    </div>
                </div>   
            </nav>   
            <div className="collapse" id="navbarToggleExternalContent">  
                <div >
                    <div className='border-top p-2 ps-0'>
                        <NavLink className='nav-link link-light ps-0' to='/app'>My Earls</NavLink>
                        <NavLink className='nav-link link-light ps-0' to='/login'>Login</NavLink>
                        <NavLink className='nav-link link-light ps-0' to='signup'>Signup</NavLink>
                    </div>
                    
                </div>
            </div>      
        </div>
        <Outlet/>
        </>
    )}
