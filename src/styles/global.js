import styled, { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #e0e0e0;
    font-family: 'Lato', sans-serif;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

`;

export const Container = styled.section`
  max-width: 500px;
  margin: 30px auto;
  background: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
