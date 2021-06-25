import React from "react";

import mainLogo from "./main-logo.svg";
import "./header.scss";

const Header = (props) => {
  const loginPanel = props.isAuth ? <div>{props.login}</div> : <div>Sign in</div>;
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img className="header__logo-img" src={mainLogo} alt="main-logo" />
          <span className="header__logo-text">Social Network</span>
        </div>
        {
          loginPanel
        }
        <div className="header__login-panel">
          
        </div>
      </div>
    </header>
  );
};

export default Header;
