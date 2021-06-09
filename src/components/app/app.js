import React from 'react';
import Header from '../header';
import SideBar from '../sideBar';
import MainSection from '../mainSection';


import './app.scss';

function App(props) {
  return (
    <div className="app__wrapper">
      <Header />
      <div className="container block__wrapper">
        <SideBar />
        <MainSection store={props.store} />
      </div>
    </div>
  );
}

export default App;
