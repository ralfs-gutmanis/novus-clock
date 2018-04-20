import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './Reset.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ConfigureStore from './ConfigureStore';

const { store, persistor } = ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

export default store;
