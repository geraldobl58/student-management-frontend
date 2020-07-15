import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import history from '../../services/history';

import * as actions from '../../store/modules/auth/actions';

import { Nav } from './styled';

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userLogged = useSelector((state) => state.auth.user.firstname);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push('/login');
  };

  return (
    <Nav>
      <div className="logo">student management</div>
      <div className="navigation">
        <Link to="/">Estudantes</Link>

        {isLoggedIn ? (
          <Link to="/register">Perfil</Link>
        ) : (
          <Link to="/register">Registrar</Link>
        )}

        {isLoggedIn ? (
          <Link to="/logout" onClick={handleLogout}>
            Sair
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}

        {isLoggedIn && (
          <p>
            Seja bem vindo(a) <strong>{userLogged}</strong>
          </p>
        )}
      </div>
    </Nav>
  );
}
