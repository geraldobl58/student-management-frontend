import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '../../styles/global';
import { Form } from './styled';
import Loading from '../../components/Loading';

import * as actions from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.user.id);
  const firstnameStored = useSelector((state) => state.auth.user.firstname);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!id) return;

    setFirstname(firstnameStored);
    setEmail(emailStored);
  }, [emailStored, id, firstnameStored]);

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

    if (!id && (password.length < 6 || password.length > 8)) {
      formErrors = true;
      toast.error('O campo senha deve conter de 6 à 8 caracteres!');
    }

    if (formErrors) return;

    dispatch(actions.registerRequest({ firstname, email, password, id }));
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? `Editando usuário ${firstname}` : 'Registre-se'}</h1>
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
        <button type="submit">{id ? `Salvar` : `Registre-se`}</button>
      </Form>
    </Container>
  );
}
