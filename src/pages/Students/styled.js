import styled from 'styled-components';

import { Link } from 'react-router-dom';

import { primaryColor, warningColor, errorColor } from '../../config/colors';

export const StudentsContainer = styled.ul`
  margin-top: 20px;

  li {
    margin-bottom: 20px;
    padding: 10px 0px;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border: none;
    }

    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    }

    svg {
      color: ${primaryColor};
    }

    .edit {
      color: ${warningColor};
    }
    .trash {
      color: ${errorColor};
    }
    .exclamation {
    }
  }
`;

export const WrapperTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NewLink = styled(Link)`
  color: #222;
  font-size: 12px;
  font-weight: 300;
  text-transform: uppercase;
`;
