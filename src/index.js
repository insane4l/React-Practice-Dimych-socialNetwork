import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './reduxStore';
import Provider from './components/storeContext/provider';


import './sassStyles/_global.scss';

<<<<<<< HEAD
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
=======
const renderApp = () => {
>>>>>>> Context API: createContext, Provider, Consumer added (without react-redux), deleted props drilling. Practice from 44 lesson
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderApp();

<<<<<<< HEAD
store.subscribe(renderApp);
>>>>>>> Practice from 38 lesson dispatch(reducer), actions
=======
store.subscribe(() => {
<<<<<<< HEAD
<<<<<<< HEAD
  renderApp(store.getState());
});
>>>>>>> Redux connected, createStore combineReducers, initialState. Practice from lesson 42
=======
  renderApp(store);
});
>>>>>>> Presentation component and Container component without redux. Practice from 43 lesson
=======
  renderApp();
});
>>>>>>> Context API: createContext, Provider, Consumer added (without react-redux), deleted props drilling. Practice from 44 lesson
