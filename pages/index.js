import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";
import { FaKey, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
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

  return (
    <>
      <Header />
      <Container>
        <SloganContainer>Your new adventure starts here.</SloganContainer>
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
        <InstallPrompt
          showInstallPrompt={showInstallPrompt}
          install={install}
          showInstallButton={showInstallButton}
        />
        <h3>
          you have to be registered to add activities and only can delete and
          edit your own activities.
        </h3>
        <p>User: test@test123.com Password: test12345</p>
        <ActivitiesTitle>Activities you might like...</ActivitiesTitle>

        {listedActivities.length === 0 ? (
          <NoActivitiesFoundContainer key="no-activities-found">
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
  font-size: 1rem;
  text-align: center;
  font-weight: 700;
  color: #333;
  width: 100%;
`;

const ActivitiesTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  margin-top: 24px;
  color: #333;
  text-align: left;
  width: 100%;
  padding-left: 16px;
`;

const NoActivitiesFoundContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  margin-bottom: 50px;
  color: #333;
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
