import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Link, NavLink } from "react-router-dom";

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
                    <button class="btn btn-outline-dark me-3" type="button">Login</button>                                        
                    <button class="btn btn-dark me-3" type="button">Sign up</button>  
                </div>   
            </nav>
        </div>
    )
}
