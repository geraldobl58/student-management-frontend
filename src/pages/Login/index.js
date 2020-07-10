import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';

import { Container } from '../../styles/global';
import { Form } from './styled';

import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    let formErrors = false;

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('O e-email está inválido!');
    }

    if (password.length < 6 || password.length > 8) {
      formErrors = true;
      toast.error('O campo senha deve conter de 6 à 8 caracteres!');
    }

    // eslint-disable-next-line no-useless-return
    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu E-mail"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua Senha"
          />
        </label>
        <button type="submit">Acessar Conta</button>
      </Form>
    </Container>
  );
}
