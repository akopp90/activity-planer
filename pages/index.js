import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";
import { FaKey, FaArrowCircleDown, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/layout/LogoutButton";

export default function ActivityPage({
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
  handleSearchInputChange,
  randomActivities,
  title,
  travelTipsCategories,
}) {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const { data: session } = useSession();
  const listedActivities = randomActivities;
  const activity = {
    id: "",
    title: "",
    categories: [],
    area: "",
    country: "",
    description: "",
    imageUrl: "",
    includes: { title: "", text: "" },
    notSuitableFor: { title: "", text: "" },
    importantInformation: { title: "", text: "" },
    whatToBring: { title: "", text: "" },
    notAllowed: { title: "", text: "" },
  };

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  
  const scrollToTravelTips = () => {
    const element = document.getElementById("travel-tips");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Header>Activity Planner</Header>
      {!session ? (
        <StyledLink href="/auth/signin">
          <FaKey />
        </StyledLink>
      ) : (
        <LogoutContainer>
          <LogoutButton />
        </LogoutContainer>
      )}
      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>

        <Search onChange={(event) => handleSearchInputChange(event)} />

        <JumpToTravelTipsContainer>
          <Link href="#travel-tips">Jump to Travel Tips</Link>
         
          <ArrowDownContainer onClick={scrollToTravelTips}>
            <FaArrowCircleDown />
          </ArrowDownContainer>
        </JumpToTravelTipsContainer>

        <ActivitiesTitle>{activity.title}</ActivitiesTitle>

        {Array.isArray(listedActivities) && listedActivities.length === 0 ? (
          <NoActivitiesFoundContainer>
            No Activities Found
          </NoActivitiesFoundContainer>
        ) : (
          listedActivities?.length > 0 && (
            <ActivitiesContainer>
              {listedActivities.map((activity) => {
                const isBookmarked = bookmarks?.includes(activity._id) || false;

                return (
                  <ActivityCard
                    key={activity._id}
                    {...activity}
                    deleteActivity={deleteActivity}
                    toggleBookmark={() => toggleBookmark(activity._id)}
                    isBookmarked={isBookmarked}
                    showHeart={showHeart}
                  />
                );
              })}
            </ActivitiesContainer>
          )
        )}

        <TravelTipsHeading id="travel-tips">Travel Tips</TravelTipsHeading>
        <TravelTipsButtonsContainer>
          {travelTipsCategories.map((cat) => (
            <Link key={cat.id} href={`/travel-tips/${cat.id}`}>
              <TravelTipButton>{cat.title} Activity Tips</TravelTipButton>
            </Link>
          ))}
        </TravelTipsButtonsContainer>
      </Container>
    </>
  );
}

const ActivitiesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  width: 100%;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 32px;
`;

const SloganContainer = styled.section`
  font-size: 1.5rem;
  text-align: center;
`;

const ActivitiesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 16px;
  color: #333;
  text-align: left;
  width: 100%;
  padding-left: 16px;
`;

const NoActivitiesFoundContainer = styled.div``;

const TravelTipsHeading = styled.h2``;

const TravelTipButton = styled.div`
  padding: 12px;
  border-radius: 4px;
  background: linear-gradient(#ececec, #d3d3d3);
  text-align: center;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    box-shadow: #b6b6b6 0px 2px 2px 1px;
  }
`;

const TravelTipsButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledLink = styled(Link)`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  position: absolute;
  top: 80px;
  right: 24px;
`;

const LogoutContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 24px;
`;

const JumpToTravelTipsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ArrowDownContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 2rem;
  transition: transform 0.3s ease-in-out, color 0.3s ease;

  &:hover {
    color: #007bff;
    transform: translateY(5px);
  }

  &:active {
    transform: translateY(2px);
  }
`;
