import styled from "styled-components";
import { useRef } from "react";

function Upload({ name, isRequired, children, onChange, multiple }) {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    inputRef.current.files = files;
    onChange(e);
  };

  return (
    <>
      <StyledLabel htmlFor={name}>{children}</StyledLabel>
      <StyledDiv onDragOver={handleDragOver} onDrop={handleDrop}>
        <StyledLabel>
          Drag and drop or click to upload (max 5 files a 5MB)
        </StyledLabel>
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
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 4px;
  background-color: #fff;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  font-size: 0.75rem;
`;

const StyledInput = styled.input`
  font: inherit;
  padding: 0;
  border-radius: 4px;
  font-size: 0.875rem;
  border: none;
  background-color: transparent;
  margin: 0;
`;
