import styled from 'styled-components';

import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    color: white;
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
  }

  .navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      color: white;
      font-size: 16px;
      font-weight: 300;
      text-transform: uppercase;
      margin: 0 30px 0 0;
    }
  }
`;
