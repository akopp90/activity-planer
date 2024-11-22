import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityFilter from "@/components/layout/ActivityFilter";
import { useSession } from "next-auth/react";
import { FaFilter, FaPlus, } from "react-icons/fa";
import Link from "next/link";
export default function HomePage({
  handleAddActivity,
  activities,
  bookmarks,
  toggleBookmark,
  handleFilter,
  filter,
}) {
  const { data: session } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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

  return (
    <>
      <Head>
        <title>DailyAdventures</title>
      </Head>
      <Header />
      <StyledSection>
        <Button onClick={() => setShowFilter(!showFilter)}>
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
        activities={activities}
        handleFilter={handleFilter}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
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
const StyledLink = styled(Link)`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 14px;
  background-color: #fff;
`;

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  align-items: center;
`;


