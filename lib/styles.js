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
    background-color: ${({ theme }) => (theme === "dark" ? "#121212" : "#ffffff")};
    transition: all 0.3s ease;
  }

  /* Light mode */
  body.light {
    color: #333;
    background-color: #fff;
  }

  /* Dark mode */
  body.dark {
    color: #fff;
    background-color: #121212;
  }

  button {
    background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#ececec")};
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
    border: none;
    padding: 10px;
    border-radius: 5px;
    transition: 0.3s;
  }

  a {
    color: ${({ theme }) => (theme === "dark" ? "#bb86fc" : "#1a73e8")};
    text-decoration: none;
  }
  
`;

