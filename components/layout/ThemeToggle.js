import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleContainer = styled.button`
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  position: relative;
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }

  &:hover svg {
    color: white;
    transform: rotate(360deg);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$visible ? 1 : 0};
  transform: ${props => props.$visible ? 'scale(1)' : 'scale(0.5)'};
  transition: all 0.3s ease;
`;

export default function ThemeToggle({ toggleTheme, currentTheme }) {
  return (
    <ToggleContainer onClick={toggleTheme} aria-label="Toggle theme">
      <IconWrapper $visible={currentTheme === 'dark'}>
        <FaMoon />
      </IconWrapper>
      <IconWrapper $visible={currentTheme === 'light'}>
        <FaSun />
      </IconWrapper>
    </ToggleContainer>
  );
}
