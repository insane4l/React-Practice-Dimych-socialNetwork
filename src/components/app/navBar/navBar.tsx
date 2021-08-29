import React from 'react'
import {NavLink} from 'react-router-dom'

import * as icons from '../../../assets/icons'
import './navBar.scss'

const NavBar: React.FC = () => {
    return (
      <nav className="navbar">
        <ul className="navbar__list">
			<NavbarLink url="/profile" iconLink={icons.profileIcon} label="Profile" />
			<NavbarLink url="/users" iconLink={icons.usersIcon} label="Users" />
			<NavbarLink url="/messages" iconLink={icons.messagesIcon} label="Messages" />
      <NavbarLink url="/chat" iconLink={icons.chatIcon} label="Developers Chat" />
			<NavbarLink url="/news" iconLink={icons.newsIcon} label="News" />
			<NavbarLink url="/music" iconLink={icons.musicIcon} label="Music" />

			<NavbarLink url="/settings" iconLink={icons.settingsIcon} label="Settings" />
        </ul>
      </nav>
    );
}


const NavbarLink: React.FC<NavbarLinkPropsType> = ({url, iconLink, label}) => {
  return (
    <li className="navbar__list-item">
		<NavLink className="navbar__link" to={url} activeClassName="navbar__link_active">
			<img className="navbar__link-icon" src={iconLink} alt={`${label} icon`} />
			<span className="navbar__link-label">{label}</span>
		</NavLink>
    </li>
  )
}

export default NavBar



type NavbarLinkPropsType = {
  url: string
  iconLink: string
  label: string
}