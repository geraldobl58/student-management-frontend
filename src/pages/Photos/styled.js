import styled from 'styled-components';

import { primaryGreyColor } from '../../config/colors';

export const Form = styled.form`
  label {
    display: flex;
    width: 180px;
    height: 180px;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background: #eee;
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    border: 3px dashed ${primaryGreyColor};
  }

  input {
    display: none;
  }

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
  }
`;
