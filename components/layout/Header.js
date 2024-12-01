import styled from "styled-components";
import Image from "next/image";
import { useTheme } from "styled-components";

export default function Header() {
  const theme = useTheme();
  return (
    <StyledHeader>
      <Logo
        src={theme === "dark" ? "/Logo_white.png" : "/Logo_white.png"}
        alt="DailyAdventures Logo"
        width={270}
        height={100}
      />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  border-bottom: 1px solid ${(props) => props.theme.border};
`;
const Logo = styled(Image)`
  ${(props) =>
    props.theme === "dark" &&
    `
    content: url('/images/logo_white.png');
  `}
`;
