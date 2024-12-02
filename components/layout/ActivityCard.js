import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { FaHeart, FaRegHeart, FaShare } from "react-icons/fa";
import Rating from '../ui/Rating';

export default function ActivityCard({
  _id,
  title,
  description,
  categories,
  imageUrl,
  viewMode,
  isBookmarked,
  toggleBookmark,
  showHeart = true,
  handleShare,
  activity,
  onRatingSubmit,
  averageRating,
  totalRatings,
  location,
  area,
  country,
}) {
  console.log('Props in ActivityCard:', {
    title,
    handleShare: typeof handleShare,
  });

  const onShare = () => {
    if (typeof handleShare === 'function') {
      handleShare(title, description);
    } else {
      console.warn('handleShare is not a function for activity:', title);
    }
  };

  return (
    <StyledArticle data-testid="activity">
      {viewMode === "Grid" && (
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
        </StyledImageContainer>
      )}

      {showHeart && (
        <StyledHeartIconContainer onClick={() => toggleBookmark(_id)}>
          {isBookmarked ? <StyledFaHeart fill="#ff4d4d" /> : <StyledFaHeart />}
        </StyledHeartIconContainer>
      )}
      <StyledShareIconContainer onClick={onShare}>
        <StyledFaShare />
      </StyledShareIconContainer>

      <StyledList>
        {Array.isArray(categories) &&
          categories.map((category) => (
            <StyledListItem key={category} data-testid="category">
              {category}
            </StyledListItem>
          ))}
      </StyledList>

      <StyledLink href={`/activity/${_id}`}>{title}</StyledLink>

      <StyledCard>
        <CardContent>
          <Location>
            {area}, {country}
          </Location>
          <Rating
            activityId={_id}
            averageRating={averageRating}
            totalRatings={totalRatings}
          />
        </CardContent>
      </StyledCard>
    </StyledArticle>
  );
}

const StyledArticle = styled.article`
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  border: 1px solid ${(props) => props.theme.border};
  box-shadow: 0 2px 4px ${(props) => props.theme.border}40;

  &:hover {
    box-shadow: 0 4px 8px ${(props) => props.theme.border}60;
  }
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
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.text};
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

const StyledShareIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 50px;
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
`;

const StyledFaShare = styled(FaShare)`
  path {
    stroke: black;
    stroke-width: 3rem;
    stroke-linejoin: round;
    stroke-linecap: round;
    paint-order: stroke;
  }
  overflow: visible;
`;

const StyledFaHeart = styled(FaHeart)`
  path {
    stroke: black;
    stroke-width: 3rem;
    stroke-linejoin: round;
    stroke-linecap: round;
    paint-order: stroke;
  }
  overflow: visible;
`;

const StyledFaRegHeart = styled(FaRegHeart)`
  path {
    stroke: black;
    stroke-width: 1rem;
    stroke-linejoin: round;
    stroke-linecap: round;
    paint-order: stroke;
  }
  overflow: visible;
`;

const StyledCard = styled.div`
  padding: 16px;
`;

const ImageContainer = styled.div`
  height: 300px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Location = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 16px;
`;