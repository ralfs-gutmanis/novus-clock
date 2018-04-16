import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './Reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import clockApp from './actions/Reducers';


const store = createStore(clockApp);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
