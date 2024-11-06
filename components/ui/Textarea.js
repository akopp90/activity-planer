import styled from "styled-components";

export default function Textarea({ name, children, defaultValue }) {
  return (
    <StyledDiv>
      <StyledLabel htmlFor={name.toLowerCase()}>{children}</StyledLabel>
      <StyledTextarea
        name={name.toLowerCase()}
        id={name.toLowerCase()}
        defaultValue={defaultValue}
      ></StyledTextarea>
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
const StyledTextarea = styled.textarea`
  font: inherit;
  resize: vertical;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  border: 1px solid #ccc;
`;
