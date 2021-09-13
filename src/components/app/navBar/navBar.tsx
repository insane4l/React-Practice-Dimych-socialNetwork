import React from 'react'
import {NavLink} from 'react-router-dom'
import NewMessagesCounter from './newMessagesCounter'

import * as icons from '../../../assets/icons'
import './navBar.scss'

const NavBar: React.FC = () => {
    return (
		<nav className="navbar">
			<ul className="navbar__list">
				<NavbarLink url="/profile" iconLink={icons.profileIcon} label="Profile" />
				<NavbarLink url="/users" iconLink={icons.usersIcon} label="Users" />
				<NavbarLink url="/dialogs" iconLink={icons.dialogsIcon} label="Dialogs" showNewMessagesCounter />
				<NavbarLink url="/chat" iconLink={icons.chatIcon} label="Developers Chat" />
				<NavbarLink url="/news" iconLink={icons.newsIcon} label="News" />
				<NavbarLink url="/music" iconLink={icons.musicIcon} label="Music" />

				<NavbarLink url="/settings" iconLink={icons.settingsIcon} label="Settings" />
			</ul>
      	</nav>
    )
}


const NavbarLink: React.FC<NavbarLinkPropsType> = ({url, iconLink, label, showNewMessagesCounter}) => {
  return (
    <li className="navbar__list-item">
		<NavLink className="navbar__link" to={url} activeClassName="navbar__link_active">
			<img className="navbar__link-icon" src={iconLink} alt={`${label} icon`} />
			<span className="navbar__link-label">{label}</span>
      		{showNewMessagesCounter && <NewMessagesCounter rerenderSecs={90} />}
		</NavLink>
    </li>
  )
}



export default NavBar



type NavbarLinkPropsType = {
  url: string
  iconLink: string
  label: string
  showNewMessagesCounter?: boolean
}