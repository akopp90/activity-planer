import styled from "styled-components";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = ({ toggleTheme, currentTheme }) => {
  return (
    <StyledButton onClick={toggleTheme}>
      {currentTheme === "light" ? <FaMoon /> : <FaSun />}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  padding: 8px;
  border-radius: 50%;

  &:hover {
    background: ${(props) => props.theme.border};
  }
`;

export default ThemeToggle;
