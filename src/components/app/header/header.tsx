import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link, NavLink} from 'react-router-dom'
import { AppStateType } from "../../../reduxStore"
import {logout} from '../../../reducers/authReducer'

import {mainLogo} from "../../../assets/images"
import "./header.scss"
import UserAvatar from "../../common/userAvatar/userAvatar"

const Header: React.FC = () => {

  const isAuthorized = useSelector( (state: AppStateType) => state.auth.isAuthorized)
  const userId = useSelector( (state: AppStateType) => state.auth.id)
  const userLogin = useSelector( (state: AppStateType) => state.auth.login)
  const userAvatar = useSelector( (state: AppStateType) => state.auth.authUserPhoto)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch( logout() )
  }

  const loginLink = <NavLink className="header__login-btn" to="/login">Log in</NavLink>;
  const userName = <div className="header__login-data">
                      <UserAvatar linkTo={`/profile/${userId}`} className="header__login-avatar" userImage={userAvatar} />
                      <span className="header__login-nickname">{userLogin}</span>
                      <button className="header__login-btn" onClick={onLogout}>Log out</button>
                   </div>

  const loginPanel = isAuthorized ? userName : loginLink;
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">

          <Link className="header__logo" to="/chat">
            <img className="header__logo-img" src={mainLogo} alt="main-logo" />
            <span className="header__logo-text">Social Network</span>
          </Link>
          
          <div className="header__login-panel">
          {loginPanel}
          </div>

        </div>
        
      </div>
    </header>
  )
}

export default Header
