import { useRouter } from "next/router";
import ActivityDetails from "@/components/layout/ActivityDetails";
import Button from "@/components/ui/Button";
import { useState } from "react";
import ActivityForm from "@/components/layout/ActivityForm";
import styled from "styled-components";

export default function ActivityPage({
  activities,
  handleAddActivity,
  handleEditActivity,
}) {
  const router = useRouter();
  const { id } = router.query;
  const activity = activities.find((activity) => activity.id === id);
  const [showForm, setShowForm] = useState(false);

  if (!activity) return <p>Loading...</p>;
  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  return (
    <>
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
      <ActivityDetails {...activity} />
    </>
  );
}
const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
