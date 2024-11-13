import styled from "styled-components";
import Link from "next/link";
import { FaHome, FaStar, FaWalking } from "react-icons/fa";


const Footer = () => {
  return (
    <MenuFooterContainer>
      <StyledUl>
        <StyledLi>
          <Link href="/activities">
            Activities <FaWalking />
          </Link>
        </StyledLi>
        <StyledHome>
          <Link href={"/"}>
            <FaHome />
          </Link>
        </StyledHome>
        <StyledLi>
          <Link href="/my-favorites">
          My Favorites <FaStar />
          </Link>
        </StyledLi>
      </StyledUl>
    </MenuFooterContainer>
  );
};

const MenuFooterContainer = styled.div`
  display: flex;
  background: white;
  box-shadow: inset 0px 0 17px -8px gray;
  width: 100vw;
  position: fixed;
  bottom: 0;
  justify-content: center;
  gap: 16px;

  a {
    text-decoration: none;
    color: #000000;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  border: solid 1px #ccc;
  height: 65px;
  width: 100%;
`;

const StyledLi = styled.li`
  border: solid 1px #ccc;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 15px;
`;

const StyledHome = styled.li`
  border: solid 1px #ccc;
  width: 30%;
  height: 100%;
  text-align: center;
  padding: 15px;
`;

export default Footer;
