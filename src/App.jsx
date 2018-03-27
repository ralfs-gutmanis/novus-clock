import React from 'react';
import {
  Route,
  // Link
} from 'react-router-dom';
import Game from './Game';

const App = () => (
  <Route path="/" component={Game} />
);

export default App;
