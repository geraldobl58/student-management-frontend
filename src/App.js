import React from 'react';
import { Router } from 'react-router-dom';
import history from './services/history';

import Global from './styles/global';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <Router history={history}>
      <Global />
      <Header />
      <Routes />
    </Router>
  );
}

export default App;
