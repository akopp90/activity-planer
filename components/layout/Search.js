import React from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

function Search({ onChange }) {
  return (
    <SearchBarContainer>
      <SearchIconContainer>
        <FaSearch size={20} />
      </SearchIconContainer>
      <SearchInput placeholder="Search activities..." onChange={onChange} />
    </SearchBarContainer>
  );
}

export default Search;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.5rem;
  margin: 24px;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.cardBackground};
  width: 90%;
  max-width: 600px;
`;

const SearchIconContainer = styled.div`
  margin-right: 0.5rem;
  color: ${(props) => props.theme.text};
`;

const SearchInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};

  &::placeholder {
    color: ${(props) => props.theme.secondary};
  }
`;
