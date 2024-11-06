import styled from "styled-components";

export default function Input({ name, isRequired, children, defaultValue }) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={name}>{children}</StyledLabel>
      <StyledInput
        type="text"
        name={name.toLowerCase()}
        id={name}
        required={isRequired}
        defaultValue={defaultValue}
      />
    </StyledDiv>
  );
}

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
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  border: 1px solid #ccc;
`;
