import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";

export default function HomePage({ handleAddActivity, activities, bookmarks,  toggleBookmark }) {
  const [showForm, setShowForm] = useState(false);
  


  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>
      
      <StyledSection>
        {!showForm ? (
          <Button onClick={() => setShowForm(true)} isPrimary>
            New activity
          </Button>
        ) : (
          <ActivityForm
            handleAddActivity={handleAddActivity}
            setShowForm={setShowForm}
          />
        )}
      </StyledSection>

      <ActivityList
        activities={activities}
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
      />
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
