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

export default function ActivityPage({
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
  handleSearchInputChange,
  randomActivities,
  viewMode,
  handleViewMode,
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
  console.log("Props in ActivityPage:", {
    handleShare,
    randomActivities: randomActivities?.length,
    bookmarks: bookmarks?.length,
  });
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
          <SearchIconContainer onClick={toggleSearchVisibility}>
            <FaSearch size={20} />
          </SearchIconContainer>

          <Button
            onClick={() => setShowFilter(!showFilter)}
            name="filter"
            id="filter"
          >
            <StyledIcon>
              <FaFilter />
            </StyledIcon>
            ({filter.length})
          </Button>
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
        <SloganContainer>Your new adventure starts here ...</SloganContainer>
        {isSearchVisible && (
          <SearchBarContainer>
            <SearchIconContainer>
              <FaSearch size={20} />
            </SearchIconContainer>
            <SearchInput
              placeholder="Search activities..."
              onChange={handleSearchInputChange}
            />
            <SearchButtonContainer>
              <Button isPrimary>Search</Button>
            </SearchButtonContainer>
          </SearchBarContainer>
        )}
        <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
        <InstallPrompt
          showInstallPrompt={showInstallPrompt}
          install={install}
          showInstallButton={showInstallButton}
        />
        <JumpToTravelTipsContainer>
          <Link href="#travel-tips">Jump to Travel Tips</Link>

          <ArrowDownContainer onClick={scrollToTravelTips}>
            <FaArrowCircleDown />
          </ArrowDownContainer>
        </JumpToTravelTipsContainer>
        <ActivitiesTitle>Activities you might like...</ActivitiesTitle>
        {listedActivities.length === 0 ? (
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
        )}

        <TravelTipsSection>
          <TravelTipsHeading id="travel-tips">Travel Tips</TravelTipsHeading>
          <TravelTipsButtonsContainer>
            {travelTipsCategories.map((cat) => (
              <Link key={cat.id} href={`/travel-tips/${cat.id}`}>
                <TravelTipButton>{cat.title} Travel Tips</TravelTipButton>
              </Link>
            ))}
          </TravelTipsButtonsContainer>
        </TravelTipsSection>
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
  margin-bottom: 50px;
`;

const StyledSection = styled.section`
  gap: 16px;
  width: 100%;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
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

const NoActivitiesFoundContainer = styled.div`
  font-size: 1.5rem;
`;

const TravelTipsSection = styled.section`
  padding: 2rem 0;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  margin: 2rem 0;
`;

const TravelTipsHeading = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 600;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: ${({ theme }) => theme.primary};
    border-radius: 2px;
  }
`;

const TravelTipsButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 0 1rem;

  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const TravelTipButton = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    background: ${({ theme }) => theme.primary};
    color: white;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.cardBackground};
  width: 90%;
  max-width: 600px;
  transition: all 0.3s ease;
`;

const SearchInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 0.5rem;
  width: 100%;
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};

  &::placeholder {
    color: ${(props) => props.theme.text}80;
  }
`;

const SearchIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  font-size: 1rem;
  transition: background-color 0.3s, border-color 0.3s;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.border};
  }
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
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

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;
