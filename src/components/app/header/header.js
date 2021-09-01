import React from "react";
import {Link, NavLink} from 'react-router-dom';

import {mainLogo} from "../../../assets/images";
import "./header.scss";

const Header = (props) => {

  const loginLink = <NavLink className="header__login-btn" to="/login">Log in</NavLink>;
  const userName = <div>
                      <span className="header__login-nickname">{props.userLogin}</span>
                      <button className="header__login-btn" onClick={props.logout}>Log out</button>
                   </div>;

  const loginPanel = props.isAuth ? userName : loginLink;
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
  );
};

export default Header;
