import React from 'react';
import HeaderContainer from '../header';
import SideBar from '../sideBar';
import MainSection from '../mainSection';


import './app.scss';

function App() {
  return (
    <div className="app__wrapper">
      <HeaderContainer />
      <div className="container block__wrapper">
        <SideBar />
        <MainSection />
      </div>
    </div>
  );
}

export default App;
