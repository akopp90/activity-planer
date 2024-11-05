import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityCreateForm from "@/components/layout/ActivityCreateForm";

export default function HomePage({ activities, setActivities }) {
  const [showForm, setShowForm] = useState(false);

  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>
      {!showForm ? (
        <StyledSection>
          <Button onClick={() => setShowForm(true)} isPrimary>
            New activity
          </Button>
        </StyledSection>
      ) : (
        <ActivityCreateForm
          handleAddActivity={handleAddActivity}
          setShowForm={setShowForm}
        />
      )}
      <ActivityList activities={activities} />
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
