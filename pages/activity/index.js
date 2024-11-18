import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityFilter from "@/components/layout/ActivityFilter";
import { FaSearch } from "react-icons/fa";
import Search from "@/components/layout/Search";

export default function HomePage({
  handleAddActivity,
  bookmarks,
  toggleBookmark,
  handleFilter,
  filter,
  filteredActivities,
  handleSearchInputChange,
  listedActivities,
  handleResetFilter,
}) {
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

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>

      <StyledSection>
      <SearchIconContainer onClick={toggleSearchVisibility}>
          <FaSearch size={20} />
        </SearchIconContainer>
        
        <Button onClick={handleToggleEdit} isPrimary>
          New activity
        </Button>
        <Button onClick={() => setShowFilter(!showFilter)}>
          Filter ({filter.length})
        </Button>
      </StyledSection> 

      {isSearchVisible && <Search filteredActivities={filteredActivities} onChange={handleSearchInputChange} />}
      {showForm && (
        <ActivityForm
          handleAddActivity={handleAddActivity}
          handleToggleEdit={handleToggleEdit}
          setShowForm={setShowForm}
          activity={activity}
        />
      )}
      {showFilter && (
        <ActivityFilter filter={filter} handleFilter={handleFilter} />
      )}

      <ActivityList
        activities={filteredActivities != "" ? filteredActivities : listedActivities}
        handleFilter={handleFilter}
        bookmarks={bookmarks}
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
z-index: 10;
transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }  
`;