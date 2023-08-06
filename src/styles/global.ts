import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html,
  body {
    max-width: 100vw;
    min-height:100vh;
    overflow-x: hidden;
    font-family: "Helvetica Neue", "Helvetica", "Arial", "PingFang TC",
      "PingFang SC", "Microsoft JhengHei", "Microsoft YaHei", "sans-serif";
  }

  
`;
