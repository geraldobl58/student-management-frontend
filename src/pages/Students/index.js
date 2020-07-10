import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { get } from 'lodash';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';

import api from '../../services/api';

import { StudentsContainer } from './styled';

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

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Estudantes</h1>
      <StudentsContainer>
        {students.map((student) => (
          <li key={student.id}>
            {get(student, 'Files[0].url', false) ? (
              <img src={student.Files[0].url} alt={student.firstname} />
            ) : (
              <FaUserCircle size={100} className="avatar" />
            )}
            <p>{student.firstname}</p>
            <p>{student.lastname}</p>
            <p>{student.email}</p>
            <p>
              <Link to={`/student/${student.id}`}>
                <FaEdit size={16} className="edit" />
              </Link>
            </p>
            <p>
              <Link to={`/student/${student.id}`}>
                <FaTrash size={16} className="trash" />
              </Link>
            </p>
          </li>
        ))}
      </StudentsContainer>
    </Container>
  );
}
