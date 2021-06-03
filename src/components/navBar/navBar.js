import React from 'react';
import './navBar.scss';

const NavBar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar__list">
                <li className="navbar__list-item">Profile</li>
                <li className="navbar__list-item">Messages</li>
                <li className="navbar__list-item">News</li>
                <li className="navbar__list-item">Music</li>
                <li className="navbar__list-item">Settings</li>
            </ul>
        </nav>
    )
}

export default NavBar;