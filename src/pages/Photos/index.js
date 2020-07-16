import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { get } from 'lodash';
import { toast } from 'react-toastify';
import api from '../../services/api';
import history from '../../services/history';

import { Form } from './styled';

import { Container } from '../../styles/global';

import Loading from '../../components/Loading';

import * as actions from '../../store/modules/auth/actions';

export default function Photos({ match }) {
  const dispatch = useDispatch();

  const id = get(match, 'params.id', '');

  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/students/${id}`);
        setPhoto(get(response.data, 'Files[0].url', ''));
        setIsLoading(false);
      } catch {
        toast.error('Whopps: Houve um erro ao realizar o upload!');
        setIsLoading(false);
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleChange = async (e) => {
    const photo = e.target.files[0];
    const photoUrl = URL.createObjectURL(photo);

    setPhoto(photoUrl);

    const formData = new FormData();
    formData.append('student_id', id);
    formData.append('file', photo);

    try {
      setIsLoading(true);
      await api.post(`/photos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Avatar enviado com sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response', '');
      toast.error('Whopps: Houve um erro ao enviar o avatar!');

      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Avatar</h1>
      <Form>
        <label htmlFor="photo">
          {photo ? <img src={photo} alt="Photo" /> : 'Selecionar'}
          <input type="file" id="photo" onChange={handleChange} />
        </label>
      </Form>
    </Container>
  );
}

Photos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
