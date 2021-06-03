import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import './sassStyles/_global.scss';
import './sassStyles/_interface.scss';

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
