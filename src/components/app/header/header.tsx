import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../../../reducers/authReducer'
import UserAvatar from "../../common/userAvatar/userAvatar"
import { actions } from "../../../reducers/appReducer"
import RequestError from "../../common/errors/requestError"
import MobileMenu from "./mobileMenu"
import * as authSelectors from "../../../selectors/auth"
import * as appSelectors from "../../../selectors/app"

import {mainLogo} from "../../../assets/images"
import "./header.scss"


const Header: React.FC = () => {

	const isAuthorized = useSelector(authSelectors.getIsAuthorized)
	const userId = useSelector(authSelectors.getAuthUserId)
	const userLogin = useSelector(authSelectors.getLogin)
	const userAvatar = useSelector(authSelectors.getAuthUserPhoto)
	const unhandledError = useSelector(appSelectors.getUnhandledError)
	const dispatch = useDispatch()


	useEffect( () => {
		if (unhandledError) {
			setTimeout( () => {
				dispatch(actions.unhandledErrorCatched(false))
			}, 10000)
		}
	}, [unhandledError])

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

				<MobileMenu />

				<Link className="header__logo" to="/chat">
					<img className="header__logo-img" src={mainLogo} alt="main-logo" />
					<span className="header__logo-text">Social Network</span>
				</Link>
				
				<div className="header__login-panel">
				{loginPanel}
				</div>

				{unhandledError && <RequestError 
									className="app-unhandled-error"
									errorMessage="Something goes wrong, server error. Please try refresh the page" />}

			</div>
			
			</div>
		</header>
	)
}

export default Header
