import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function ActivityCard({ id, title, categories, imageUrl }) {
  const router = useRouter();

  return (
    <StyledArticle>
      <StyledImageContainer>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            style={{ objectFit: "cover" }}
            sizes="33vw"
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
      <StyledList>
        {categories.map((category) => (
          <StyledListItem key={category}>{category}</StyledListItem>
        ))}
      </StyledList>
      <StyledLink href={`/activity/${id}`}>{title}</StyledLink>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
`;
const StyledImageContainer = styled.div`
  height: 200px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
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
const StyledLink = styled(Link)`
  color: inherit;
  font-weight: bold;
  font-size: 1.25rem;
  margin: 0 16px 16px;
  display: inline-block;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;
