import poppins from "@/lib/fonts";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  input::file-selector-button {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.border};
    background-color: ${(props) => props.theme.cardBackground};
    color: ${(props) => props.theme.text};
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: ${(props) => props.theme.border};
    }
  }

  input {
    background-color: ${(props) => props.theme.cardBackground};
    color: ${(props) => props.theme.text};
    border: 1px solid ${(props) => props.theme.border};
    transition: all 0.3s ease;

    &::placeholder {
      color: ${(props) => props.theme.text}80;
    }
  }
  
  a {
    color: inherit;
    text-decoration: none;
  }
  ul {
    list-style: none;
  }

  body {
    color: #000;
    font-family: ${poppins.style.fontFamily}, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
  }
    
`;
