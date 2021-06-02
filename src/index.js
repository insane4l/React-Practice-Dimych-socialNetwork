import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import './sassStyles/_global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
