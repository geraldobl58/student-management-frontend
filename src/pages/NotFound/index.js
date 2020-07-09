import React from 'react';

import { Error } from './styled';
import { Container } from '../../styles/global';

export default function NotFound() {
  return (
    <Container>
      <Error>
        <span role="img" aria-label="sorry">
          🤔
        </span>
        <div>Whoops: A página não foi encontrada!</div>
        <span role="img" aria-label="sorry">
          🤔
        </span>
      </Error>
    </Container>
  );
}
