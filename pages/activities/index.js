import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityFilter from "@/components/layout/ActivityFilter";

export default function HomePage({
  handleAddActivity,
  activities,
  bookmarks,
  toggleBookmark,
  handleFilter,
  filter,
}) {
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const activity = {
    id: "",
    title: "",
    categories: [],
    area: "",
    country: "",
    description: "",
    imageUrl: "",
  };

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>

      <StyledSection>
        <Button onClick={handleToggleEdit} isPrimary>
          New activity
        </Button>
        <Button onClick={() => setShowFilter(!showFilter)}>
          Filter ({filter.length})
        </Button>
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
  gap: 16px;
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
