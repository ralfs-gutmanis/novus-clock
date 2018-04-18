import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import GameContainer from './game/GameContainer';
import ConfigContainer from './config/ConfigContainer';

const App = () => (
  <Switch>
    <Route exact path="/" component={GameContainer} />
    <Route path="/config" component={ConfigContainer} />
  </Switch>
);

export default App;
