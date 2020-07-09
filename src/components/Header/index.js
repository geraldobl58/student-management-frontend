import React from 'react';

import { FaHome, FaUserAlt, FaSignInAlt } from 'react-icons/fa';

import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <div className="logo">student management</div>
      <div className="navigation">
        <a href="">Home</a>
        <a href="">Login</a>
        <a href="">
          <FaSignInAlt />
        </a>
      </div>
    </Nav>
  );
}
