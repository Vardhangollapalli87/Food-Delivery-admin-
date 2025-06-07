import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets.js'

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
            <img src={assets.logo} alt="logo"  className='logo-img'/>
            <p className='logo-context'>Admin Panel</p>
        </div>
      <img src={assets.profile_image} alt="profile" className='profile'/>
    </div>
  )
}

export default Navbar
