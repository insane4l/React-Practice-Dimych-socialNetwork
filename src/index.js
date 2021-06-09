import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import {store, subscribe} from './store';

import './sassStyles/_global.scss';

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <App store={store}/>
      </Router>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
renderApp();

subscribe(renderApp);