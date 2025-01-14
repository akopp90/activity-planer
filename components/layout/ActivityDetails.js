import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetchWeatherData } from "@/lib/weather";
import { useSession } from "next-auth/react";
import {
  FaShoppingBag,
  FaThumbsDown,
  FaInfo,
  FaBook,
  FaCheckCircle,
  FaTimesCircle,
  FaCloudRain,
  FaMoon,
  FaSun,
  FaSnowflake,
  FaCloud,
  FaArrowLeft,
  FaArrowRight,
  FaShare,
} from "react-icons/fa";
import { FaRegHeart, FaHeart } from "react-icons/fa6";

import dynamic from "next/dynamic";
import styled from "styled-components";

const ActivityMap = dynamic(() => import("@/components/layout/ActivityMap"), {
  ssr: false,
});

function getWeatherIcon(condition) {
  switch (condition) {
    case "Sunny":
      return <FaSun color="gold" />;
    case "Cloudy":
      return <FaCloud color="gray" />;
    case "Rainy":
      return <FaCloudRain color="blue" />;
    case "Snowy":
      return <FaSnowflake color="lightblue" />;
    case "Clear Night":
      return <FaMoon color="navy" />;
    default:
      return <FaCloud color="gray" />;
  }
}

export default function ActivityDetails({
  title,
  imageUrl,
  area,
  location,
  description,
  country,
  categories,
  _id,
  deleteActivity,
  duration,
  numberOfPeople,
  fullDescription,
  includes,
  notSuitableFor,
  importantInformation,
  whatToBring,
  notAllowed,
  toggleBookmark,
  isBookmarked,
  handleShare,
  showHeart = true,
}) {
  const imageUrls = imageUrl ? imageUrl : [];
  const { data: weather } = useSWR(
    location?.lat && location?.lon
      ? ["weather", location.lat, location.lon]
      : null,
    ([, lat, lon]) => fetchWeatherData(lat, lon)
  );

  const [mainImage, setMainImage] = useState(imageUrls[0]);
  function handleDelete() {
    setShowConfirm(true);
  }
  function cancelDelete() {
    setShowConfirm(false);
  }
  function confirmDelete() {
    deleteActivity(_id);
    setShowConfirm(false);
  }
  function handleSetMainImage(url) {
    setMainImage(url);
    mutate();
  }
  const imageListRef = useRef(null);

  function handleScroll(offset) {
    if (imageListRef.current) {
      imageListRef.current.scrollBy(offset, 0);
    }
  }

  return (
    <StyledContainer>
      <StyledDetails>
        <StyledImageContainer>
          {imageUrls ? (
            <Image
              src={mainImage}
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
          <StyledShareIconContainer onClick={() => handleShare(title, description)}>
            <StyledFaShare/>
          </StyledShareIconContainer>
          {showHeart && (
            <StyledHeartIconContainer onClick={() => toggleBookmark(_id)}>
              {isBookmarked ? <StyledFaHeart fill="#ff4d4d" /> : <FaRegHeart />}
            </StyledHeartIconContainer>
          )}
        </StyledImageContainer>
        <StyledImageSlider>
          <StyledPrevButton onClick={() => handleScroll(-150)}>
            <FaArrowLeft />
          </StyledPrevButton>
          <StyledUl ref={imageListRef}>
            {imageUrls?.map((url) => (
              <StyledLi key={url}>
                <StyledImage
                  key={url}
                  src={url}
                  alt={title}
                  width={150}
                  height={100}
                  onClick={() => handleSetMainImage(url)}
                />
              </StyledLi>
            ))}
          </StyledUl>
          <StyledNextButton onClick={() => handleScroll(150)}>
            <FaArrowRight />
          </StyledNextButton>
        </StyledImageSlider>
        <StyledContainer>
          <StyledTitle>{title}</StyledTitle>
          <StyledList>
            {categories.map((category) => (
              <StyledListItem key={category}>{category}</StyledListItem>
            ))}
          </StyledList>
          <StyledLocation>
            {area}, {country}
          </StyledLocation>
          <p>{description}</p>
          <StyledSubtitle>About this Activity</StyledSubtitle>
          <p>{duration}</p>
          <p>{numberOfPeople}</p>
          <StyledSubtitle>About this Experience</StyledSubtitle>

          <StyledExtraTitle>
            <FaBook /> Full Description
          </StyledExtraTitle>
          <p>{fullDescription}</p>

          <StyledExtraTitle>
            <FaCheckCircle /> Includes
          </StyledExtraTitle>
          <StyledExtraDescription>
            {Array.isArray(includes) ? (
              includes.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>{includes}</li>
            )}
          </StyledExtraDescription>
          {notSuitableFor && (
            <>
              <StyledExtraTitle>
                <FaThumbsDown /> Not suitable for
              </StyledExtraTitle>
              <StyledExtraDescription>
                {Array.isArray(notSuitableFor) ? (
                  notSuitableFor.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>{notSuitableFor}</li>
                )}
              </StyledExtraDescription>
            </>
          )}

          <StyledExtraTitle>
            <FaInfo /> Important Information
          </StyledExtraTitle>
          <StyledExtraDescription>
            {Array.isArray(importantInformation) ? (
              importantInformation.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>{importantInformation}</li>
            )}
          </StyledExtraDescription>
          {whatToBring && (
            <>
              <StyledExtraTitle>
                <FaShoppingBag /> What to bring
              </StyledExtraTitle>
              <StyledExtraDescription>
                {Array.isArray(whatToBring) ? (
                  whatToBring.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>{whatToBring}</li>
                )}
              </StyledExtraDescription>
            </>
          )}
          {notAllowed && (
            <>
              <StyledExtraTitle>
                <FaTimesCircle /> Not Allowed
              </StyledExtraTitle>
              <StyledExtraDescription>
                {Array.isArray(notAllowed) ? (
                  notAllowed.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>{notAllowed}</li>
                )}
              </StyledExtraDescription>

              {weather ? (
                <>
                  <p>
                    <strong>Weather: </strong>
                    {weather.temperature} {getWeatherIcon(weather.condition)}
                  </p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </>
          )}
          <ActivityMap {...location} />
        </StyledContainer>
      </StyledDetails>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  background-color: ${(props) => props.theme.background};
`;
const StyledDetails = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px ${(props) => props.theme.border};
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
`;
const StyledImageContainer = styled.div`
  height: 50vh;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.background};
`;
const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 16px 0;
  color: ${(props) => props.theme.text};
`;
const StyledSubtitle = styled.h3`
  font-size: 1.2rem;
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
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
`;
const StyledLocation = styled.p`
  color: ${(props) => props.theme.secondary};
  display: flex;
  margin: 8px 0 16px;
  justify-content: flex-end;
  gap: 10px;
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
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  box-shadow: 0 2px 4px ${(props) => props.theme.border};
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
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  box-shadow: 0 2px 4px ${(props) => props.theme.border};
  &:hover {
    color: #ff4d4d;
  }
`;

const StyledExtraTitle = styled.h4`
  font-weight: bold;
`;

const StyledExtraDescription = styled.ul`
  margin-left: 10px;
  padding: 8px;
  list-style: circle;
`;

const StyledLi = styled.li`
  padding: 4px 8px;
  width: 150px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.background};
`;
const StyledImage = styled(Image)`
  border-radius: 4px;
  cursor: pointer;
`;
const StyledUl = styled.ul`
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 8px;
  gap: 8px;
`;

const StyledArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  border: none;
  padding: 8px;
  cursor: pointer;
  z-index: 10;
`;

const StyledPrevButton = styled(StyledArrowButton)`
  left: 0;
`;

const StyledNextButton = styled(StyledArrowButton)`
  right: 0;
`;

const StyledImageSlider = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.background};
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