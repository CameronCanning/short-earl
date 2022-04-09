import React from 'react';

import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className='container-fluid'>
                    <button
                        className="navbar-toggler shadow-none border-0 ps-0"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <NavLink className="navbar-brand mb-0 h1" to="/">short-earl</NavLink>
                    <div className="collapse navbar-collapse justify-content-end me-0" id="navbarDropDown">  
                        <ul className="navbar-nav me-1 mb-lg-0">
                            <li className='nav-item'>
                                <NavLink className='nav-link' to='/urls'>My Earls</NavLink>
                            </li>
                        </ul>
                        <NavLink to='/login'>              
                            <button className="btn btn-outline-dark me-2" type="button">Login</button>  
                        </NavLink> 
                        <NavLink to='/signup'>                                       
                            <button className="btn btn-dark" type="button">Sign Up</button>  
                        </NavLink> 
                    </div>
                </div>   
            </nav>
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header justify-content-end">
                    <button type="button" className="btn-close text-reset pe-3 pt-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul className="navbar-nav flex-grow-1 pe-3 float-end">
                        <li className="nav-item">
                            <a className="nav-link active " aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/urls'>My Earls</NavLink> 
                        </li>
                        <NavLink className='nav-link' to='/urls'>My Earls</NavLink>
                    </ul>
                </div>
            </div>            
        </div>
    )}
