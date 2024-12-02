import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect, useContext } from "react";
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
import { Content } from "next/font/google";
import RecommendedActivities from "@/components/layout/RecommendedActivities";
import UserContext from "@/context/UserContext";

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
  const [recommendedActivities, setRecommendedActivities] = useState([]);
  const { userPreferences } = useContext(UserContext);

  useEffect(() => {
    if (randomActivities && randomActivities.length > 0) {
      // Get recommended activities based on various factors
      const getRecommendedActivities = () => {
        let recommendations = [...randomActivities];
        
        // 1. If user is logged in and has preferences, prioritize those
        if (session?.user && userPreferences) {
          // Filter by preferred categories if available
          if (userPreferences.categories?.length > 0) {
            recommendations = recommendations.filter(activity => 
              userPreferences.categories.some(cat => 
                activity.category?.toLowerCase().includes(cat.toLowerCase())
              )
            );
          }

          // Filter by preferred location if available
          if (userPreferences.location) {
            recommendations = recommendations.filter(activity =>
              activity.location?.address?.toLowerCase().includes(
                userPreferences.location.toLowerCase()
              )
            );
          }
        }

        // 2. Prioritize activities with higher ratings
        recommendations.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        // 3. Prioritize newer activities
        recommendations = recommendations.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        // 4. If we have too few recommendations, add some random popular activities
        if (recommendations.length < 5) {
          const popularActivities = randomActivities
            .filter(activity => !recommendations.includes(activity))
            .sort((a, b) => (b.rating || 0) - (a.rating || 0))
            .slice(0, 5 - recommendations.length);
          
          recommendations = [...recommendations, ...popularActivities];
        }

        // 5. Limit to 10 recommendations
        return recommendations.slice(0, 10);
      };

      setRecommendedActivities(getRecommendedActivities());
    }
  }, [randomActivities, session, userPreferences]);

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
        </Container>
        <ContentContainer>
        <RecommendedActivities 
          activities={recommendedActivities} 
          handleShare={handleShare}
          handleBookmark={toggleBookmark}
        />

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
</ContentContainer>
        
     
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
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 80px;
`;