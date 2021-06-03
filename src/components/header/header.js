import React from "react";

import mainLogo from "./main-logo.svg";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__logo">
          <img className="header__logo-img" src={mainLogo} alt="main-logo" />
          <span className="header__logo-text">Social Network</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
