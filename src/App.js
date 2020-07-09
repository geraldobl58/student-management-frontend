import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
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
      <ToastContainer autoClose={3000} />
    </Router>
  );
}

export default App;
