import styled from 'styled-components';

import { primaryColor } from '../../config/colors';

export const ContainerWrapper = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
  small {
    font-size: 12px;
  }
`;

export const Form = styled.form`
  max-width: 700px;
  margin: 20px auto;

  display: flex;
  flex-direction: column;

  input {
    color: #222;
    font-size: 12px;
    font-family: 'Lato', sans-serif;
    padding: 10px;
    border: none;
    width: 700px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;

    &::placeholder {
      color: #ccc;
    }

    &:focus {
      border: 1px solid ${primaryColor};
    }
  }

  button {
    color: white;
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;

    &:hover {
      background: #129da5;
    }
  }
`;

export const ProfilePicture = styled.div`
  display: flex;

  img {
    width: 200px;
    margin-right: 10px;
    box-shadow: 0px 0px 5px 1px #ccc;
  }
`;
