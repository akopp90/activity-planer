import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function Header() {
  return (
    <StyledHeader>
      <Image src="/LOGO.png" width={270} height={100} alt="Image is missing" />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 15px;
  border-bottom: 1px solid #ccc;
  background-color: white;
`;
