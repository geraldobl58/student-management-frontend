import React, { useState } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { get } from 'lodash';
import { Container } from '../../styles/global';
import { Form } from './styled';

import api from '../../services/api';
import history from '../../services/history';

export default function Register() {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    let formErrors = false;

    if (firstname.length < 3 || firstname > 255) {
      formErrors = true;
      toast.error('O campo nome deve conter de 3 à 255 caracteres!');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('O e-email está inválido!');
    }

    if (password.length < 6 || password.length > 8) {
      formErrors = true;
      toast.error('O campo senha deve conter de 6 à 8 caracteres!');
    }

    if (formErrors) return;

    try {
      await api.post('/users', {
        firstname,
        email,
        password,
      });
      toast.success('Registro realizado com sucesso!');
      history.push('/login');
    } catch (err) {
      const errors = get(err, 'response.data.errors', []);

      errors.map((error) => toast.error(error));
    }
  }

  return (
    <Container>
      <h1>Registre-se</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="firstname">
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Seu Nome"
          />
        </label>
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
        <button type="submit">Criar Conta</button>
      </Form>
    </Container>
  );
}
