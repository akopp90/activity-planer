import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

export default function FavoriteActivityCard({
  title,
  country,
  categories,
  imageUrl,
}) {
  return (
    <StyledFavoriteCard
      style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: "cover" }}
    >
      <CardHeader>
        <TagsContainer>
          {categories.map((category) => (
            <StyledTag key={category}>{category}</StyledTag>
          ))}
        </TagsContainer>

        <HeartContainer>
          <FaHeart style={{ color: "red" }} />
        </HeartContainer>
      </CardHeader>

      <CardFooter>
        <TitleContainer>{title}</TitleContainer>
        <CountryContainer>{country}</CountryContainer>
      </CardFooter>
    </StyledFavoriteCard>
  );
}

const StyledFavoriteCard = styled.div`
  margin-bottom: 12px;
  height: 125px;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const StyledTag = styled.div`
  padding: 4px 8px;
  font-size: 0.75rem;
  border-radius: 4px;
  background-color: #f1f1f1;
  list-style-type: none;
  display: inline-block;
  margin-right: 6px;
`;

const TitleContainer = styled.div`
  color: #fff;
  font-size: 22px;
`;

const CountryContainer = styled.div`
  background-color: #f1f1f1;
  border-radius: 4px;
  padding: 4px 8px;
  color: #000000;
  font-size: 16px;
`;

const TagsContainer = styled.div``;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeartContainer = styled.div``;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
`;