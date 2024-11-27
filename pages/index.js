import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";
import { FaKey, FaArrowCircleDown, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import IconButton from "@/components/ui/IconButton";
import LogoutButton from "@/components/layout/LogoutButton";
import Button from "@/components/ui/Button";
import InstallPrompt from "@/components/ui/InstallPrompt";

export default function ActivityPage({
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
  handleSearchInputChange,
  randomActivities,
  title,
  viewMode,
  handleViewMode,
  travelTipsCategories,
  showInstallPrompt,
  install,
  showInstallButton,
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

      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>

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
        <p>
          You have to be registered to add activities and only can delete and
          edit your own activities.
        </p>
        <p>User: test@test123.com Password: test12345</p>
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
                  const isBookmarked =
                    bookmarks?.includes(activity._id) || false;

                  return (
                    <ActivityCard
                      key={activity._id}
                      {...activity}
                      viewMode={viewMode}
                      deleteActivity={deleteActivity}
                      toggleBookmark={() => toggleBookmark(activity._id)}
                      isBookmarked={isBookmarked}
                      showHeart={showHeart}
                    />
                  );
                })}
              </ActivitiesContainer>
            </>
          )
        )}

        <TravelTipsHeading id="travel-tips">Travel Tips</TravelTipsHeading>
        <TravelTipsButtonsContainer>
          {travelTipsCategories.map((cat) => (
            <Link key={cat.id} href={`/travel-tips/${cat.id}`}>
              <TravelTipButton>{cat.title} travel Tips</TravelTipButton>
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  width: 90%;
  max-width: 600px;
`;
const SearchIconContainer = styled.div`
  margin-right: 0.5rem;
`;
const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
`;
const SearchInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 0.5rem;
  width: 100%;
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
