import styled from "styled-components";

export default function Header({ children }) {
  return (
    <StyledHeader>
      <h1>{children}</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 16px 0;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;
