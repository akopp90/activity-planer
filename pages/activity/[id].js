import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import ActivityForm from "@/components/layout/ActivityForm";
import ActivityDetails from "@/components/layout/ActivityDetails";
import { useSession } from "next-auth/react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export default function ActivityPage({
  activities,
  handleEditActivity,
  handleDeleteActivity,
  toggleBookmark,
  bookmarks,
  showHeart = true,
}) {
  const router = useRouter();
  const { id } = router.query;
  const activity = activities.find((activity) => activity.id === id);
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!activity) return <p>Loading...</p>;

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function handleConfirmDelete() {
    handleDeleteActivity(activity.id);
    setShowConfirm(false);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
  }

  const isBookmarked = bookmarks?.includes(activity.id) || false;

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header />
      {session && (
        <>
          {!showForm ? (
            <StyledSection>
              <Button onClick={handleToggleEdit}>
                <StyledIcon>
                  <FaEdit />
                </StyledIcon>
              </Button>

              <Button onClick={handleDeleteClick}>
                <StyledIcon>
                  <FaTrashAlt />
                </StyledIcon>
              </Button>
            </StyledSection>
          ) : (
            <ActivityForm
              handleToggleEdit={handleToggleEdit}
              handleEditActivity={handleEditActivity}
              activity={activity}
            />
          )}
        </>
      )}

      {showConfirm && (
        <StyledConfirmContainer>
          <StyledConfirmMessage>
            <p>Are you sure you want to delete this activity?</p>
            <StyledButtonGroup>
              <Button onClick={handleConfirmDelete} isPrimary>
                Confirm
              </Button>
              <Button onClick={handleCancelDelete}>Cancel</Button>
            </StyledButtonGroup>
          </StyledConfirmMessage>
        </StyledConfirmContainer>
      )}

      <ActivityDetails
        {...activity}
        deleteActivity={handleDeleteActivity}
        toggleBookmark={() => toggleBookmark(id)}
        isBookmarked={isBookmarked}
        showHeart={showHeart}
      />
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  gap: 10px;
  padding: 0 24px;
  justify-content: flex-end;
  align-items: center;
`;

const StyledConfirmContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledConfirmMessage = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
`;

const StyledIcon = styled.div`
  font-size: 1rem;
  justify-content: center;
  align-items: center;
`;
