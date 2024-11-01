import { uid } from "uid";
import Image from "next/image";
import styled from "styled-components";

export default function ActivityCard({ title, categories, imageUrl }) {
  return (
    <StyledCardSection>
      <StyledImageDiv>
        <Image
          src={imageUrl}
          alt={title}
          style={{ objectFit: "cover" }}
          sizes="33vw"
          fill
        />
      </StyledImageDiv>
      <StyledList>
        {categories.map((category) => (
          <StyledListItem key={uid()}>{category}</StyledListItem>
        ))}
      </StyledList>
      <StyledTitle>{title}</StyledTitle>
    </StyledCardSection>
  );
}

const StyledCardSection = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
`;
const StyledImageDiv = styled.div`
  height: 200px;
  position: relative;
  background-color: #f1f1f1;
`;
const StyledList = styled.ul`
  gap: 8px;
  display: flex;
  list-style: none;
  margin: 16px 16px 8px 16px;
`;
const StyledListItem = styled.li`
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 4px;
  background-color: #f1f1f1;
`;
const StyledTitle = styled.h2`
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0 16px 16px;
`;
