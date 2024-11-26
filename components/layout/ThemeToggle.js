import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.add(savedTheme);  
    } else {
      setTheme("light");
    }
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); 
    document.body.classList.toggle("dark-mode", newTheme === "dark");
  };

  return (
    <ToggleButton onClick={toggleTheme}>
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#000")};
  font-size: 24px;
  cursor: pointer;
  z-index: 100;
`;

export default ThemeToggle;
