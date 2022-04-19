import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router} from 'react-router-dom'
import App from './components/app'
import store from './reduxStore'
import {Provider} from 'react-redux'

import './sassStyles/_global.scss'
import { HelmetProvider } from 'react-helmet-async'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HelmetProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </HelmetProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)