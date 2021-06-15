import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './reduxStore';

import './sassStyles/_global.scss';

const renderApp = (store) => {
  debugger;
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

store.subscribe(() => {
  renderApp(store);
});