import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --transition: all 300ms ease-in-out;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
  }

   .tox-notification--warning {
    display: none !important;
  }

  .tox-dialog-wrap__backdrop {
    background-color: unset !important;
    backdrop-filter: blur(20px);
  }

  .tox-dialog {
    border-radius: 8px !important;
  }
`;
