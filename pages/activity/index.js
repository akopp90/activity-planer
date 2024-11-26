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
import IconButton from "@/components/ui/IconButton";
import LogoutButton from "@/components/layout/LogoutButton";
import { FaKey, FaSearch } from "react-icons/fa";
import Link from "next/link";

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
  viewMode,
  handleViewMode,
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
  if (filteredActivities.length === 0) {
    return <p>No activities found</p>;
  }
  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>
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
        <SearchIconContainer onClick={toggleSearchVisibility}>
          <FaSearch size={20} />
        </SearchIconContainer>
        <Button onClick={() => setShowFilter(!showFilter)}>
          Filter ({filter.length})
        </Button>
        {filteredActivities.length === 0 && <p>No activities found</p>}
        {session ? (
          <>
            <Button onClick={handleToggleEdit} isPrimary>
              New activity
            </Button>
            <LogoutButton />
          </>
        ) : (
          <StyledLink href="/auth/signin">
            <FaKey />
          </StyledLink>
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
        viewMode={viewMode}
        toggleBookmark={toggleBookmark}
        handleResetFilter={handleResetFilter}
      />
    </>
  );
}

const StyledSection = styled.section`
  gap: 16px;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;

const SearchIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  background-color: #f1f1f1;
  top: 100px;
  left: 16px;
  width: 40px;
  height: 40px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #e0e0e0;
  }
`;
const StyledLink = styled(Link)`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
`;
