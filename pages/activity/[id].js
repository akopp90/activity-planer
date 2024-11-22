import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityDetails from "@/components/layout/ActivityDetails";
import { useSession } from "next-auth/react";
export default function ActivityPage({
  activities,
  handleEditActivity,
  handleDeleteActivity,
  toggleBookmark,
  bookmarks,
  showHeart = true,
  mutate,
}) {
  const router = useRouter();
  const { id } = router.query;
  const [showForm, setShowForm] = useState(false);
  const { status, data } = useSession();

  if (!activities) return <p>Loading...</p>;

  const activity = activities.find((activity) => activity._id === id);
  if (!activity) return <p>Activity not found</p>;

  function deleteActivity(id) {
    handleDeleteActivity(id);
  }

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  const isBookmarked = bookmarks?.includes(activity._id) || false;

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Details</Header>

      {status === "authenticated" && data.user?.id === activity.createdBy && (
        <>
          {!showForm ? (
            <StyledSection>
              <Button onClick={() => setShowForm(true)} isPrimary>
                Edit activity
              </Button>
            </StyledSection>
          ) : (
            <>
              <StyledSection>
                <Button onClick={() => setShowForm(!showForm)} isPrimary>
                  Edit activity
                </Button>
              </StyledSection>
              <ActivityForm
                handleToggleEdit={handleToggleEdit}
                handleEditActivity={(newActivity) => {
                  handleEditActivity(newActivity);
                  mutate();
                }}
                activity={activity}
              />
            </>
          )}
        </>
      )}
      <ActivityDetails
        {...activity}
        deleteActivity={deleteActivity}
        toggleBookmark={() => toggleBookmark(activity._id)}
        isBookmarked={isBookmarked}
        showHeart={showHeart}
      />
    </>
  );
}
const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
`;
