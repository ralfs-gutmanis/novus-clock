import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Game from './game/Game';
import Config from './config/Config';

const App = () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route path="/config" component={Config} />
  </Switch>
);

export default App;
