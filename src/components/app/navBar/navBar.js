import React from 'react';
import {NavLink} from 'react-router-dom';

import {profileIcon, friendsIcon, messagesIcon, newsIcon, musicIcon, settingsIcon} from '../../../assets/icons';
import './navBar.scss';

const NavBar = () => {
    return (
      <nav className="navbar">
        <ul className="navbar__list">
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/profile" activeClassName="navbar__link_active">
              <img className="navbar__link-icon" src={profileIcon} alt="link icon" />
              <span className="navbar__link-label">Profile</span>
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/friends" activeClassName="navbar__link_active">
              <img className="navbar__link-icon" src={friendsIcon} alt="link icon" />
              <span className="navbar__link-label">Friends</span>
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/messages" activeClassName="navbar__link_active">
                <img className="navbar__link-icon" src={messagesIcon} alt="link icon" />
                <span className="navbar__link-label">Messages</span>
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/news" activeClassName="navbar__link_active">
                <img className="navbar__link-icon" src={newsIcon} alt="link icon" />
                <span className="navbar__link-label">News</span>
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/music" activeClassName="navbar__link_active">
                <img className="navbar__link-icon" src={musicIcon} alt="link icon" />
                <span className="navbar__link-label">Music</span>
            </NavLink>
          </li>
          <li className="navbar__list-item">
            <NavLink className="navbar__link" to="/settings" activeClassName="navbar__link_active">
                <img className="navbar__link-icon" src={settingsIcon} alt="link icon" />
                <span className="navbar__link-label">Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    );
}

export default NavBar;