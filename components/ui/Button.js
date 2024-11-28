import styled from "styled-components";

export default function Button({
  type = "button",
  onClick,
  isPrimary,
  isDeleting,
  children,
  deleteImage,
  id,
  name,
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      $primary={isPrimary}
      $delete={isDeleting}
      $deleteImage={deleteImage}
      id={id}
      name={name}
    >
      {children}
    </StyledButton>
  );
}
const StyledButton = styled.button`
  gap: 8px;
  height: 40px;
  display: flex;
  font: inherit;
  cursor: pointer;
  padding: 0 16px;
  font-weight: bold;
  border-radius: 4px;
  font-size: 0.75rem;
  align-items: center;
  color: ${(props) =>
    props.$primary ? props.theme.cardBackground : props.theme.text};
  border: 1px solid
    ${(props) => (props.$primary ? props.theme.text : props.theme.border)};
  background-color: ${(props) =>
    props.$primary
      ? props.$delete
        ? "#ff0000"
        : props.theme.text
      : props.$delete
      ? "#ff0000"
      : props.theme.cardBackground};

  ${(props) =>
    props.$deleteImage &&
    css`
      position: relative;
      z-index: 1;
      top: 0;
      right: 0;
    `}
`;
