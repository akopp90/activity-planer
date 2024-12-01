import styled from "styled-components";
import { useRef } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa";

function Upload({ name, isRequired, children, onChange, multiple }) {
  const inputRef = useRef(null);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    inputRef.current.files = files;
    onChange(event);
  };

  return (
    <>
      <StyledLabel htmlFor={name}>{children}</StyledLabel>
      <StyledDiv onDragOver={handleDragOver} onDrop={handleDrop}>
        <UploadInstructions>
          <FaArrowUpFromBracket size={24} />
          <span>Drag and drop or click to upload (max 5 files a 5MB)</span>
        </UploadInstructions>
        <StyledInput
          type="file"
          name={name.toLowerCase()}
          id={name}
          required={isRequired}
          onChange={onChange}
          multiple={multiple}
          accept="image/png, image/jpeg, image/jpg"
          ref={inputRef}
        />
      </StyledDiv>
    </>
  );
}

export default Upload;

const StyledDiv = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
  border: 2px dashed ${props => props.theme.border};
  padding: 16px;
  border-radius: 4px;
  background-color: ${props => props.theme.cardBackground};
  color: ${props => props.theme.text};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    background-color: ${props => props.theme.cardBackground}80;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 0.75rem;
  color: ${props => props.theme.text};
  text-align: left;
  cursor: pointer;
`;

const UploadInstructions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.text};
  
  svg {
    fill: ${props => props.theme.text};
  }
`;

const StyledInput = styled.input`
  font: inherit;
  padding: 0;
  border-radius: 4px;
  font-size: 0.875rem;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.text};
  margin: 0;
  cursor: pointer;

  &::file-selector-button {
    font: inherit;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 0.875rem;
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.cardBackground};
    color: ${props => props.theme.text};
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 8px;

    &:hover {
      background-color: ${props => props.theme.border};
    }
  }
`;
