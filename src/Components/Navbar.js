import React, { useState } from 'react'
import logo from "./images/logo.png"
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (<>
        <div className="navbar">
            <Link to="/">
            <img className="logo-image" src={logo} alt="" />
            </Link>
            
                <ul className="navbar-items">
                    <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/about">About</Link>
                </li>
                </ul>



        
        </div>
    </>
    )
}
export default Navbar
