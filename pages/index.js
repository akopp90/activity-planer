import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";
import {
  FaKey,
  FaArrowCircleDown,
  FaSearch,
  FaPlus,
  FaFilter,
} from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import IconButton from "@/components/ui/IconButton";
import LogoutButton from "@/components/layout/LogoutButton";
import Button from "@/components/ui/Button";
import InstallPrompt from "@/components/ui/InstallPrompt";
import ThemeToggle from "@/components/layout/ThemeToggle";
import RandomActivities from "@/components/layout/RandomActivities";
import LatestActivities from "@/components/layout/LatestActivities";
import TravelTips from "@/components/layout/TravelTips";

export default function ActivityPage({
  toggleBookmark,
  randomActivities,
  travelTipsCategories,
  showInstallPrompt,
  install,
  showInstallButton,
  toggleTheme,
  currentTheme,
  session,
  filter,
  handleResetFilter,
  handleShare,
}) {
  
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
  function toggleSearchVisibility() {
    setIsSearchVisible((prevState) => !prevState);
    handleResetFilter();
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

      <Container>
        <StyledSection>
          <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
          {session && (
            <>
              <Button onClick={handleToggleEdit}>
                <StyledIcon>
                  <FaPlus />
                </StyledIcon>
              </Button>
            </>
          )}
        </StyledSection>
        
        <InstallPrompt
          showInstallPrompt={showInstallPrompt}
          install={install}
          showInstallButton={showInstallButton}
        />
        <ActivitiesTitle>Activities you might like...</ActivitiesTitle>
        <RandomActivities 
          activities={listedActivities} 
          handleShare={handleShare}
          handleBookmark={toggleBookmark}
        />

        <LatestActivities 
          activities={listedActivities}
        />

        <TravelTips categories={travelTipsCategories} />

       {/*  {listedActivities.length === 0 ? (
          <NoActivitiesFoundContainer key="no-activities-found">
            No Activities Found
          </NoActivitiesFoundContainer>
        ) : (
          listedActivities?.length > 0 && (
            <>
              <StyledSection>
                <IconButton
                  variant="Grid"
                  viewMode={viewMode}
                  handleViewMode={handleViewMode}
                />
                <IconButton
                  variant="List"
                  viewMode={viewMode}
                  handleViewMode={handleViewMode}
                />
              </StyledSection>
              <ActivitiesContainer>
                {listedActivities.map((activity) => {
                 const isBookmarked = bookmarks?.includes(activity._id) || false;

                  return (
                    <ActivityCard
                      key={activity._id}
                      {...activity}
                      viewMode={viewMode}
                      handleShare={handleShare}
                      isBookmarked={isBookmarked}
                      toggleBookmark={toggleBookmark}
                      showHeart={showHeart}
                    />
                  );
                })}
              </ActivitiesContainer>
            </>
          )
        )} */}

        
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
  gap: 16px;
  margin-bottom: 50px;
`;

const StyledSection = styled.section`
  gap: 16px;
  width: 100%;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;



const ActivitiesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
  text-align: left;
  width: 100%;
  padding-left: 16px;
`;


const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;
