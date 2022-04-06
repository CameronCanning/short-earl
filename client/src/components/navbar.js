import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand mb-0 h1 ms-3" to="/">short-earl</NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">  
                    <ul class="navbar-nav me-3 mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/urls'>My Earls</NavLink>
                        </li>
                    </ul>
                    <NavLink to='/login'>              
                        <button class="btn btn-outline-dark me-3" type="button">Login</button>  
                    </NavLink> 
                    <NavLink to='/signup'>                                       
                        <button class="btn btn-dark me-3" type="button">Sign Up</button>  
                    </NavLink> 
                </div>   
            </nav>
        </div>
    )
}
