import React from 'react';
import {NavLink} from 'react-router-dom';

import {profileIcon, usersIcon, messagesIcon, newsIcon, musicIcon, settingsIcon} from '../../../assets/icons';
import './navBar.scss';

const NavBar = () => {
    return (
      <nav className="navbar">
        <ul className="navbar__list">
			<NavbarLink url="/profile" iconLink={profileIcon} label="Profile" />
			<NavbarLink url="/users" iconLink={usersIcon} label="Users" />
			<NavbarLink url="/messages" iconLink={messagesIcon} label="Messages" />
			<NavbarLink url="/news" iconLink={newsIcon} label="News" />
			<NavbarLink url="/music" iconLink={musicIcon} label="Music" />

			<NavbarLink url="/settings" iconLink={settingsIcon} label="Settings" />
        </ul>
      </nav>
    );
}

const NavbarLink = ({url, iconLink, label}) => {
  return (
    <li className="navbar__list-item">
		<NavLink className="navbar__link" to={url} activeClassName="navbar__link_active">
			<img className="navbar__link-icon" src={iconLink} alt={`${label} icon`} />
			<span className="navbar__link-label">{label}</span>
		</NavLink>
    </li>
  )
}

export default NavBar;