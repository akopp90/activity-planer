import styled from "styled-components";
import { FaThLarge, FaBars } from "react-icons/fa";

export default function IconButton({ variant, viewMode, handleViewMode }) {
  return variant === "Grid" ? (
    <Button
      type="button"
      $isActive={viewMode === "Grid"}
      onClick={() => handleViewMode("Grid")}
    >
      <FaThLarge size={20} fill={viewMode === "Grid" ? "#fff" : "#000"} />
    </Button>
  ) : (
    <Button
      type="button"
      $isActive={viewMode === "List"}
      onClick={() => handleViewMode("List")}
    >
      <FaBars size={20} fill={viewMode === "List" ? "#fff" : "#000"} />
    </Button>
  );
}

const Button = styled.button`
  width: 40px;
  border: none;
  height: 40px;
  display: flex;
  cursor: pointer;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.$isActive ? "#000" : "#f1f1f1")};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? "#444" : "#e0e0e0")};
  }
`;
