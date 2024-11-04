import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function ActivityCard({ id, title, categories, imageUrl }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/activity/${id}`);
  };

  return ( 
    <StyledArticle>
    <StyledImageContainer>
        <Image
          src={imageUrl}
          alt={title}
          style={{ objectFit: "cover" }}
          sizes="33vw"
          fill
        />
    </StyledImageContainer>
    <StyledList>
      {categories.map((category) => (
        <StyledListItem key={category}>{category}</StyledListItem>
      ))}
    </StyledList>
    <StyledTitle>
      <Link href={`/activity/${id}`}>{title}</Link>
    </StyledTitle>
  </StyledArticle>
);
}


const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  cursor: pointer;  
`;
const StyledImageContainer = styled.div`
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