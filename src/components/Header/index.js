import React from 'react';
import { Link } from 'react-router-dom';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <div className="logo">student management</div>
      <div className="navigation">
        <Link to="/">Estudantes</Link>
        <Link to="/register">Registrar</Link>
        <Link to="/login">Login</Link>
      </div>
    </Nav>
  );
}
