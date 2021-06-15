import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './reduxStore';

import './sassStyles/_global.scss';

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
//for github test
=======
const renderApp = () => {
=======
const renderApp = (state) => {
>>>>>>> Redux connected, createStore combineReducers, initialState. Practice from lesson 42
=======
const renderApp = (store) => {
  debugger;
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App store={store}/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderApp(store);

<<<<<<< HEAD
store.subscribe(renderApp);
>>>>>>> Practice from 38 lesson dispatch(reducer), actions
=======
store.subscribe(() => {
<<<<<<< HEAD
  renderApp(store.getState());
});
>>>>>>> Redux connected, createStore combineReducers, initialState. Practice from lesson 42
=======
  renderApp(store);
});
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
