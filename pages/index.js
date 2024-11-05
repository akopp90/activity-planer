import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityList from "@/components/layout/ActivityList";
import ActivityForm from "@/components/layout/ActivityForm";

export default function HomePage({ handleActivity, activities }) {
  const [showForm, setShowForm] = useState(false);
  const activity = {
    id: "",
    title: "",
    categories: [],
    area: "",
    country: "",
    description: "",
    imageUrl: "",
  };
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
        <ActivityForm
          handleActivity={handleActivity}
          setShowForm={setShowForm}
          activity={activity}
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
