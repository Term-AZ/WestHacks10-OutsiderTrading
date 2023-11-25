import React from 'react'
import './landing.css';
import logo from '../../images/outsider-trading-logo.png'
import graphic from '../../images/raining-money-transparent.png'
import { NavLink } from 'react-router-dom';

const landingPage = () => {
  return (
    <>
        <div class="landing-container">
            <div className='text-section'>
                <img src={logo} alt="OutsiderTrading" id="logo"/>
                <h1>Senators can regulate firms,</h1>
                <h1> then invest in those same firms.</h1>
                <h2>Just saying.</h2>

                <h3>Easily invest in and track hot congressional stocks with our automated tools.</h3>
                
                <NavLink to="/portfolio" style={{textDecoration: "none"}} className="butt">Build your portfolio today</NavLink>
            </div>

            <div className="image-section">
                <img src={graphic} alt="landing-graphic" id="large-graphic"/>
            </div>
        </div> 

    </>
    
  )
}

export default landingPage