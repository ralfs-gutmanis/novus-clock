import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Game from './game/Game';
import ConfigContainer from './config/ConfigContainer';

const App = () => (
  <Switch>
    <Route exact path="/" component={Game} />
    <Route path="/config" component={ConfigContainer} />
  </Switch>
);

export default App;
