import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { isEmail, isInt, isFloat } from 'validator';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { ContainerWrapper, Form, ProfilePicture } from './styled';
import { Container } from '../../styles/global';

import api from '../../services/api';
import history from '../../services/history';

import Loading from '../../components/Loading';

import * as actions from '../../store/modules/auth/actions';

export default function Student({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', null);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setIsPhoto] = useState('');

  useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);
        const response = await api.get(`/students/${id}`);
        const avatar = get(response.data, 'Files[0].url', '');

        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
        setAge(response.data.age);
        setWeight(response.data.weight);
        setHeight(response.data.height);
        setIsPhoto(avatar);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);

        if (status === 400) {
          errors.map((error) => toast.error(error));
        }
        history.push('/');
      }
    }
    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // eslint-disable-next-line no-unused-vars
    let formsErrors = false;

    if (firstname.length < 3 || firstname.length > 255) {
      toast.error('O campo nome deve conter de 3 à 255 caracteres!');
      formsErrors = true;
    }

    if (firstname.length < 3 || firstname.length > 255) {
      toast.error('O campo sobrenome deve conter de 3 à 255 caracteres!');
      formsErrors = true;
    }

    if (!isEmail(email)) {
      formsErrors = true;
      toast.error('O e-email está inválido!');
    }

    if (!isInt(String(age))) {
      toast.error('O campo idade precisa ser um número!');
      formsErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('O campo altura precisa ser um número!');
      formsErrors = true;
    }

    // eslint-disable-next-line no-useless-return
    if (formsErrors) return;

    try {
      setIsLoading(true);
      if (id) {
        await api.put(`/students/${id}`, {
          firstname,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('O registro foi atualizado com sucesso!');
      } else {
        await api.post(`/students/`, {
          firstname,
          lastname,
          email,
          age,
          weight,
          height,
        });
        toast.success('O registro foi criado com sucesso!');
      }
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      } else {
        toast.error('Whopps: Houve um erro no servidor!');
      }

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <ContainerWrapper>
        <h1>
          {id ? (
            <p>
              Editando estudante <small>{firstname}</small>
            </p>
          ) : (
            'Novo Estudante'
          )}
        </h1>
        {id && (
          <ProfilePicture>
            {photo ? (
              <img src={photo} alt={firstname} />
            ) : (
              <FaUserCircle size={100} className="avatar" />
            )}
            <Link to={`/photos/${id}`}>
              <FaEdit color="#59bac3" />
            </Link>
          </ProfilePicture>
        )}
      </ContainerWrapper>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          placeholder="Seu Nome"
        />
        <input
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          placeholder="Seu Sobrenome"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Peso"
        />
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Altura"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Student.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
