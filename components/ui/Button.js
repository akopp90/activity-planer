import styled from "styled-components";

export default function Button({ type = "button", onClick, isPrimary, children }) {
  return (
    <StyledButton type={type} onClick={onClick} $primary={isPrimary}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  gap: 8px;
  height: 40px;
  display: flex;
  font: inherit;
  cursor: pointer;
  padding: 0 16px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 0.75rem;
  align-items: center;
  color: ${(props) => (props.$primary ? "#fff" : "#000")};
  border: 1px solid ${(props) => (props.$primary ? "#000" : "#ccc")};
  background-color: ${(props) => (props.$primary ? "#000" : "#fff")};
`;
