import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ActivityCard({
  _id,
  title,
  categories,
  imageUrl,
  isBookmarked,
  toggleBookmark,
  showHeart = true,
  activity,
}) {
  return (
    <StyledArticle data-testid="activity">
      <StyledImageContainer>
        {imageUrl ? (
          <Image
            src={imageUrl[0]}
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

        {showHeart && (
          <StyledHeartIconContainer onClick={() => toggleBookmark(_id)}>
            {isBookmarked ? <FaHeart fill="#ff4d4d" /> : <FaRegHeart />}
          </StyledHeartIconContainer>
        )}
      </StyledImageContainer>

      <StyledList>
        {Array.isArray(categories) &&
          categories.map((category) => (
            <StyledListItem key={category} data-testid="category">
              {category}
            </StyledListItem>
          ))}
      </StyledList>

      <StyledLink href={`/activity/${_id}`}>{title}</StyledLink>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  background-color: white;
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

const StyledHeartIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  text-shadow: 0 2px 2px #000;
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    color: #ff4d4d;
  }
`;
