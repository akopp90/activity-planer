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
    border: 0px solid #ccc;
    background-color: #f1f1f1;
    font-size: 0.875rem;
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
  }
    
`;
