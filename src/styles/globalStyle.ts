import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Open Sans', sans-serif;
    color: #4a4a4a;
  }
`;

export default GlobalStyle;
