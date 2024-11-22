import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { fetchWeatherData } from "@/lib/weather";
import { Unlock } from "next/font/google";
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
} from "react-icons/fa";

import Button from "../ui/Button";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

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
  activity,
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
  showHeart = true,
  createdBy,
}) {
  const session = useSession();

  const {
    data: weather,
    error,
    isLoading,
  } = useSWR(
    location?.lat && location?.lon
      ? ["weather", location.lat, location.lon]
      : null,
    ([, lat, lon]) => fetchWeatherData(lat, lon)
  );

  const [showConfirm, setShowConfirm] = useState(false);
  const [mainImage, setMainImage] = useState(imageUrl[0]);
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
          {imageUrl ? (
            <>
              <Image
                src={mainImage}
                alt={title}
                style={{ objectFit: "cover" }}
                sizes="50vw"
                fill
              />
            </>
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
              <FaHeart fill={isBookmarked ? "#ff4d4d" : "#fff"} />
            </StyledHeartIconContainer>
          )}
        </StyledImageContainer>
        <StyledImageSlider>
          <StyledPrevButton onClick={() => handleScroll(-150)}>
            <FaArrowLeft />
          </StyledPrevButton>
          <StyledUl ref={imageListRef}>
            {imageUrl?.map((url, index) => (
              <StyledLi key={index}>
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

          <StyledWeather>
            <div>
              {weather ? (
                <>
                  <p>
                    {weather.temperature} {getWeatherIcon(weather.condition)}
                  </p>
                </>
              ) : (
                <p>Loading weather data...</p>
              )}
            </div>
          </StyledWeather>

          <StyledLocation>
            {area}, {country}
          </StyledLocation>
          <StyledDescription>{description}</StyledDescription>
          <StyledSubtitle>About this Activity</StyledSubtitle>
          <StyledDescription>{duration}</StyledDescription>
          <StyledDescription>{numberOfPeople}</StyledDescription>
          <StyledSubtitle>About this Experience</StyledSubtitle>
          <StyledTitleIcon>
            <FaBook />
            <StyledExtraTitle>Full Description</StyledExtraTitle>
          </StyledTitleIcon>
          <StyledDescription>{fullDescription}</StyledDescription>
          <StyledTitleIcon>
            <FaCheckCircle />
            <StyledExtraTitle>Includes</StyledExtraTitle>
          </StyledTitleIcon>
          <StyledExtraDescription>
            {Array.isArray(includes) ? (
              includes.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>{includes}</li>
            )}
          </StyledExtraDescription>
          {notSuitableFor && (
            <>
              <StyledTitleIcon>
                <FaThumbsDown />
                <StyledExtraTitle>Not suitable for</StyledExtraTitle>
              </StyledTitleIcon>
              <StyledExtraDescription>
                {Array.isArray(notSuitableFor) ? (
                  notSuitableFor.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>{notSuitableFor}</li>
                )}
              </StyledExtraDescription>
            </>
          )}
          <StyledTitleIcon>
            <FaInfo />
            <StyledExtraTitle>Important Information</StyledExtraTitle>
          </StyledTitleIcon>
          <StyledExtraDescription>
            {Array.isArray(importantInformation) ? (
              importantInformation.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>{importantInformation}</li>
            )}
          </StyledExtraDescription>
          {whatToBring && (
            <>
              <StyledTitleIcon>
                <FaShoppingBag />
                <StyledExtraTitle>What to bring</StyledExtraTitle>
              </StyledTitleIcon>
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
              <StyledTitleIcon>
                <FaTimesCircle />
                <StyledExtraTitle>Not Allowed</StyledExtraTitle>
              </StyledTitleIcon>
              <StyledExtraDescription>
                {Array.isArray(notAllowed) ? (
                  notAllowed.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>{notAllowed}</li>
                )}
              </StyledExtraDescription>
            </>
          )}
          <ActivityMap {...location} />
          <StyledLink href="/" title="Back to Activities">
            Back to Activities
          </StyledLink>
          {session.status === "authenticated" &&
            session.data.user.id === createdBy && (
              <StyledDeleteContainer>
                {!showConfirm ? (
                  <Button onClick={() => setShowConfirm(true)}>Delete</Button>
                ) : (
                  <>
                    <p>Are you sure, that you want to delete?</p>
                    <StyledButtonContainer>
                      <Button onClick={() => setShowConfirm(false)}>
                        Cancel
                      </Button>
                      <Button isDeleting onClick={confirmDelete}>
                        Confirm
                      </Button>
                    </StyledButtonContainer>
                  </>
                )}
              </StyledDeleteContainer>
            )}
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
`;
const StyledDetails = styled.article`
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px -4px rgba(0, 0, 0, 0.5);
  margin-bottom: 50px;
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
const StyledHeartIconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  text-shadow: 0 2px 2px #000;

  &:hover {
    color: #ff4d4d;
  }
`;

const StyledDeleteContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
  border: 1px solid ${(props) => (props.$isDelete ? "#ff0000" : "#fff")};
  padding: 8px;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  gap: 5px;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: flex-end;
  position: relative;
`;
const StyledExtraTitle = styled.h4`
  font-weight: bold;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(327px, 1fr));
`;

const StyledExtraDescription = styled.ul`
  margin: 16px 0;
  margin-left: 10px;
  padding: 8px;
  list-style: circle;
`;

const StyledTitleIcon = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 7px;
`;

const StyledWeather = styled.div`
  display: flex;
  margin: 16px 0;
  list-style: none;
  border-radius: 8px;

  p {
    padding: 4px 8px;
    border-radius: 4px;
    background-color: #f1f1f1;
  }
`;

const StyledLi = styled.li`
  padding: 4px 8px;
  width: 150px;
  border-radius: 4px;
  background-color: #f1f1f1;
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
  background-color: #fff;
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
  background-color: #f1f1f1;
`;
