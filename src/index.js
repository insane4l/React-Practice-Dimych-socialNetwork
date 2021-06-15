import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './components/app';
import store from './reduxStore';
import Provider from './components/storeContext/provider';


import './sassStyles/_global.scss';

const renderApp = () => {
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

store.subscribe(() => {
  renderApp();
});