import React from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const header = () => {
  return(
    <div className='nav_background'>
        <div className='nav_container'>
            <ul className='navbar_list'>
                <li className='navbar_list_items'>
                    <NavLink className="nav_link" to="/" style={{ textDecoration: 'none' }}>Home</NavLink>
                </li>
                <li className='navbar_list_items'>
                    <NavLink className="nav_link" to="/senators" style={{ textDecoration: 'none' }}>Senators</NavLink>
                </li>
                <li className='navbar_list_items'>
                    <NavLink className="nav_link" to="/portfolio" style={{ textDecoration: 'none' }}>Portfolio</NavLink>
                </li>
                <li className='navbar_list_items'>
                    <NavLink className="nav_link" to="/user/login" style={{ textDecoration: 'none' }}>Login</NavLink>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default header