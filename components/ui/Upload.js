import styled from "styled-components";

function Upload({ name, isRequired, children, onChange }) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={name}>{children}</StyledLabel>
      <StyledInput
        type="file"
        name={name.toLowerCase()}
        id={name}
        required={isRequired}
        onChange={onChange}
        accept="image/png, image/jpeg, image/jpg"
      />
    </StyledDiv>
  );
}

export default Upload;

const StyledDiv = styled.div`
  gap: 4px;
  display: flex;
  flex-direction: column;
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
  border: 1px solid #ccc;
  background-color: #fff;
  border-radius: 4px;
  margin: 0;
`;
