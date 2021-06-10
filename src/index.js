import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './store';

import './sassStyles/_global.scss';

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
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App state={store.getState()} dispatch={store.dispatch.bind(store)}/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderApp();

store.subscribe(renderApp);
>>>>>>> Practice from 38 lesson dispatch(reducer), actions
