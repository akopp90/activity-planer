import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import Button from "../ui/Button";
import { useState } from "react";

export default function ActivityDetails({
  title,
  imageUrl,
  area,
  description,
  country,
  categories,
  id,
  deleteActivity,
  duration,
  numberOfPeople,
  fullDescription,
  includes,
  notSuitableFor,
  importantInformation,
  whatToBring,
  notAllowed,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  function handleDelete() {
    setShowConfirm(true);
  }
  function cancelDelete() {
    setShowConfirm(false);
  }
  function confirmDelete() {
    deleteActivity(id);
    setShowConfirm(false);
  }
  return (
    <StyledContainer>
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
          <StyledDescription>{description}</StyledDescription>
          <StyledSubtitle>About this Activity</StyledSubtitle>
          <StyledDescription>{duration}</StyledDescription>
          <StyledDescription>{numberOfPeople}</StyledDescription>
          <StyledSubtitle>About this Experience</StyledSubtitle>
          <StyledDescription>{fullDescription}</StyledDescription>
          <StyledDescription>{includes}</StyledDescription>
          <StyledDescription>{notSuitableFor}</StyledDescription>
          <StyledDescription>{importantInformation}</StyledDescription>
          <StyledDescription>{whatToBring}</StyledDescription>
          <StyledDescription>{notAllowed}</StyledDescription>
          <StyledLink href="/" title="Back to Activities">
            Back to Activities
          </StyledLink>
          {!showConfirm ? (
            <StyledDeleteContainer>
              <Button onClick={handleDelete}>Delete</Button>
            </StyledDeleteContainer>
          ) : (
            <StyledDeleteContainer $isDelete>
              <p>Are you sure, that you want to delete?</p>
              <StyledButtonContainer>
                <Button onClick={cancelDelete}>Cancel</Button>
                <Button isDeleting onClick={confirmDelete}>
                  Confirm
                </Button>
              </StyledButtonContainer>
            </StyledDeleteContainer>
          )}
        </StyledContainer>
      </StyledDetails>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
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
