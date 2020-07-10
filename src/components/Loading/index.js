import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styled';

import image from '../../assets/images/loading.gif';

export default function Loading({ isLoading }) {
  if (!isLoading) {
    // eslint-disable-next-line jsx-a11y/heading-has-content
    return <h1 />;
  }
  return (
    <Container>
      <div />
      <span>
        <img src={image} alt="Carregando..." />
      </span>
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
