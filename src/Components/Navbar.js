import React from 'react'
import logo from "./images/logo.png"
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (<>
        <div className="navbar">
            <NavLink to="/">
            <img className="logo-image" src={logo} alt="" />
            </NavLink>
                <ul className="navbar-items">
                    <li className="navbar-item" >
                    <NavLink exact to="/" activeClassName="active">Home</NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/about" activeClassName="active">About</NavLink>
                </li>
                </ul>



        
        </div>
    </>
    )
}
export default Navbar
