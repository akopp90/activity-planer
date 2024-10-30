import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function ActivityCard({ title, categories, imageUrl }) {
  return (
    <StyledCard>
      <StyledImageSection>
        <Image
          src={imageUrl}
          alt={title}
          style={{ objectFit: "cover" }}
          sizes="33vw"
          fill
        />
      </StyledImageSection>
      <StyledSection>
        <StyledList>
          {categories.map((category) => (
            <StyledListItem key={category}>{category}</StyledListItem>
          ))}
        </StyledList>
        <StyledLink href="#" title={title}>
          {title}
        </StyledLink>
      </StyledSection>
    </StyledCard>
  );
}

const StyledCard = styled.section`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
`;
const StyledImageSection = styled.section`
  height: 250px;
  position: relative;
  background-color: #f1f1f1;
`;
const StyledSection = styled.section`
  padding: 16px;
`;
const StyledList = styled.ul`
  gap: 8px;
  display: flex;
  list-style: none;
  margin-bottom: 8px;
`;
const StyledListItem = styled.li`
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 4px;
  background-color: #f1f1f1;
`;
const StyledLink = styled(Link)`
  color: inherit;
  font-weight: bold;
  font-size: 1.25rem;
  align-self: flex-start;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
