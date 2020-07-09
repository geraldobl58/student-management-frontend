import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <div className="logo">student management</div>
      <div className="navigation">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/logout">
          <FaSignInAlt />
        </Link>
      </div>
    </Nav>
  );
}
