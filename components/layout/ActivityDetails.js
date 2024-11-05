import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

export default function ActivityDetails({
  title,
  imageUrl,
  area,
  description,
  country,
  categories,
}) {
  return (
    <StyledDetails>
      <StyledImageContainer>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            style={{ objectFit: "cover" }}
            sizes="50vw"
            fill
          />
        ) : (
          <Image
            src="/images/no-image.svg"
            width={40}
            height={40}
            alt="Image is missing"
          />
        )}
      </StyledImageContainer>
      <StyledTitle>{title}</StyledTitle>
      <StyledList>
        {categories.map((category) => (
          <StyledListItem key={category}>{category}</StyledListItem>
        ))}
      </StyledList>
      <StyledLocation>
        {area}, {country}
      </StyledLocation>
      <StyledDescription>{description}</StyledDescription>
      <StyledLink href="/" title="Back to Activities">
        Back to Activities
      </StyledLink>
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  padding: 16px;
`;
const StyledImageContainer = styled.div`
  height: 50vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;
const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 16px 0;
`;
const StyledList = styled.ul`
  gap: 8px;
  display: flex;
  margin: 16px 0;
  list-style: none;
`;
const StyledListItem = styled.li`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f1f1f1;
`;
const StyledLocation = styled.p`
  color: #666;
  display: flex;
  margin: 8px 0 16px;
  justify-content: flex-end;
`;
const StyledDescription = styled.p`
  margin: 16px 0;
`;
const StyledLink = styled(Link)`
  color: inherit;
  font-weight: bold;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
