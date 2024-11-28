import styled from "styled-components";
import Link from "next/link";
import { FaHome, FaHeart, FaWalking, FaUser } from "react-icons/fa";

export default function Footer() {
  return (
    <MenuFooterContainer>
      <StyledUl>
        <StyledLi>
          <StyledLink href={"/"}>
            <StyledIcon>
              <FaHome />
              <span>Home</span>
            </StyledIcon>
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/activity">
            <StyledIcon>
              <FaWalking />

              <span>Activities</span>
            </StyledIcon>
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/my-favorites">
            <StyledIcon>
              <FaHeart />
              <span>Favourites</span>
            </StyledIcon>
          </StyledLink>
        </StyledLi>
        <StyledLi>
          <StyledLink href="/auth/signin">
            <StyledIcon>
              <FaUser />
              <span>Account</span>
            </StyledIcon>
          </StyledLink>
        </StyledLi>
      </StyledUl>
    </MenuFooterContainer>
  );
}

const MenuFooterContainer = styled.div`
  display: flex;
  background: ${(props) => props.theme.cardBackground};
  box-shadow: inset 0px 0 17px -8px ${(props) => props.theme.border};
  width: 100%;
  position: fixed;
  bottom: 0;
  justify-content: center;
  gap: 0;
  overflow-x: hidden;

  a {
    text-decoration: none;
    color: ${(props) => props.theme.text};
  }
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  height: 65px;

  width: 100%;
  margin: 0;
  padding: 0;
`;

const StyledLi = styled.li`
  flex: 1;
  text-align: center;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.text};

  span {
    font-size: 0.8rem;
    margin-top: 4px;
    color: ${(props) => props.theme.text};
  }
`;
