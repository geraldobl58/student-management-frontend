import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Global from './styles/global';
import Header from './components/Header';

import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Global />
      <Header />
      <Routes />
    </BrowserRouter>
  );
}

export default App;
