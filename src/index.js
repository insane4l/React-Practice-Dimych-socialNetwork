import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './reduxStore';

import './sassStyles/_global.scss';

const renderApp = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App state={state} dispatch={store.dispatch.bind(store)}/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderApp(store.getState());

store.subscribe(() => {
  renderApp(store.getState());
});