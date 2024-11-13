import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityDetails from "@/components/layout/ActivityDetails";

export default function ActivityPage({
  activities,
  handleEditActivity,
  handleDeleteActivity,
}) {
  const router = useRouter();
  const { id } = router.query;
  const activity = activities.find((activity) => activity.id === id);
  const [showForm, setShowForm] = useState(false);

  function deleteActivity(id) {
    handleDeleteActivity(id);
  }

  if (!activity) return <p>Loading...</p>;
  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Details</Header>
      {!showForm ? (
        <StyledSection>
          <Button onClick={() => setShowForm(true)} isPrimary>
            Edit activity
          </Button>
        </StyledSection>
      ) : (
        <ActivityForm
          handleToggleEdit={handleToggleEdit}
          handleEditActivity={handleEditActivity}
          activity={activity}
        />
      )}
      <ActivityDetails {...activity} deleteActivity={deleteActivity} />
    </>
  );
}
const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
