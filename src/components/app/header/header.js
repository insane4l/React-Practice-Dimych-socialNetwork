import React from "react";
import {NavLink} from 'react-router-dom';

import {mainLogo} from "../../../assets/images";
import "./header.scss";

const Header = (props) => {

  const loginLink = <NavLink to="/login">Log in</NavLink>;
  const userName = <div>
                      <span>{props.userLogin}</span>
                      <span><button onClick={props.logout}>Log out</button></span>
                   </div>;

  const loginPanel = props.isAuth ? userName : loginLink;
  return (
    <header className="header">
      <div className="container">
        <div className="header__content">

          <div className="header__logo">
            <img className="header__logo-img" src={mainLogo} alt="main-logo" />
            <span className="header__logo-text">Social Network</span>
          </div>
          
          <div className="header__login-panel">
          {loginPanel}
          </div>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
