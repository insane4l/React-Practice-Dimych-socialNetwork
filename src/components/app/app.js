import React from 'react';
import Header from '../header';
import NavBar from '../navBar';
import MainSection from '../mainSection';


import './app.scss';

function App() {
  return (
    <div className="app__wrapper">
      <Header />
      <div className="container">
        <NavBar/>
        <MainSection/>
      </div>
    </div>
  );
}

export default App;
