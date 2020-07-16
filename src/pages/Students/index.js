import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaTrash, FaExclamation } from 'react-icons/fa';

import { toast } from 'react-toastify';
import api from '../../services/api';

import { StudentsContainer, WrapperTop, NewLink } from './styled';

import { Container } from '../../styles/global';

import Loading from '../../components/Loading';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await api.get('/students');
      setStudents(response.data);
      setIsLoading(false);
    }
    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();
    try {
      setIsLoading(true);
      await api.delete(`/students/${id}`);
      const newStudents = [...students];
      newStudents.splice(index, 1);
      setStudents(newStudents);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', []);
      if (status === 401) {
        toast.error('Whopps: Você precisa realizar o login!');
      } else {
        toast.error('Whopps: Ocorreu um erro ao excluir!');
      }
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <WrapperTop>
        <h1>Estudantes</h1>
        <NewLink to="/student/">Adicionar</NewLink>
      </WrapperTop>
      <StudentsContainer>
        {students.map((student, index) => (
          <li key={student.id}>
            {get(student, 'Files[0].url', false) ? (
              <img src={student.Files[0].url} alt={student.firstname} />
            ) : (
              <FaUserCircle size={100} className="avatar" />
            )}
            <p>{student.firstname}</p>
            <p>{student.lastname}</p>
            <p>{student.email}</p>
            <Link to={`/student/${student.id}`}>
              <FaEdit size={16} className="edit" />
            </Link>

            <Link onClick={handleDeleteAsk} to={`/student/${student.id}`}>
              <FaTrash size={16} className="trash" />
            </Link>

            <FaExclamation
              onClick={(e) => handleDelete(e, student.id, index)}
              size={16}
              display="none"
              cursor="pointer"
            />
          </li>
        ))}
      </StudentsContainer>
    </Container>
  );
}
