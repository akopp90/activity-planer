import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityFilter from "@/components/layout/ActivityFilter";
import Search from "@/components/layout/Search";
import { useSession } from "next-auth/react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { FaKey, FaSearch } from "react-icons/fa";
import Link from "next/link";
import InstallPrompt from "@/components/ui/InstallPrompt";

export default function HomePage({
  handleAddActivity,
  bookmarks,
  toggleBookmark,
  handleFilter,
  filter,
  filteredActivities,
  handleSearchInputChange,
  handleResetFilter,
  mutate,
  listedActivities,
  showInstallPrompt,
  install,
  showInstallButton,
}) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const activity = {
    id: "",
    title: "",
    location: {
      address: "",
      lat: "0",
      lon: "0",
    },
    categories: [],
    area: "",
    country: "",
    description: "",
    imageUrl: "",
    duration: "",
    numberOfPeople: "",
    fullDescription: "",
    includes: "",
    notSuitableFor: "",
    importantInformation: "",
    whatToBring: "",
    notAllowed: "",
  };
  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  function toggleSearchVisibility() {
    setIsSearchVisible((prevState) => !prevState);
  }
  if (!listedActivities) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>DailyAdventures</title>
      </Head>
      <Header />
      <StyledSection>
        <SearchIconContainer onClick={toggleSearchVisibility}>
          <FaSearch size={20} />
        </SearchIconContainer>
        <InstallPrompt
          showInstallPrompt={showInstallPrompt}
          install={install}
          showInstallButton={showInstallButton}
        />
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

      {isSearchVisible && (
        <Search
          filteredActivities={filteredActivities}
          onChange={(event) => handleSearchInputChange(event)}
        />
      )}

      {showForm && (
        <ActivityForm
          handleAddActivity={(newActivity) => {
            handleAddActivity(newActivity);
            mutate();
          }}
          handleToggleEdit={handleToggleEdit}
          setShowForm={setShowForm}
          activity={activity}
        />
      )}
      {showFilter && (
        <ActivityFilter filter={filter} handleFilter={handleFilter} />
      )}

      <ActivityList
        activities={listedActivities}
        handleFilter={handleFilter}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        handleResetFilter={handleResetFilter}
      />
    </>
  );
}

const StyledSection = styled.section`
  gap: 10px;
  display: flex;
  padding: 0 20px;
  justify-content: flex-end;
`;

const SearchIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;
