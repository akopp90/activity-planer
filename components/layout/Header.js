import Link from "next/link";
import styled from "styled-components";

export default function Header({ children }) {
  return (
    <StyledHeader>
       <Link href="/">
      <h1>{children}</h1>
      </Link>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 16px 0;
  text-align: center;
  margin-bottom: 24px;
  border-bottom: 1px solid #ccc;
`;
