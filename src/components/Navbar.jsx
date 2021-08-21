import React from 'react'
import nbaLogo from '../assets/nba-logo.jpg'

const Navbar = () => {
    return (
        <div className="navbar_container">
            <a href='/' className='logo_link'><img src={nbaLogo} className="nav_logo" alt="nba logo" /></a>
            <div className="nav_links_container">
                <a href="/" className="nav_link">NBA Player Stats</a>
                <a href="/about" className="nav_link">About</a>
                <a href="/contact" className="nav_link">Contact</a>
            </div>

        </div>
    )
}

export default Navbar
