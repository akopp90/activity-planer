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
import { FaArrowLeft } from "react-icons/fa6";
import InstallPrompt from "@/components/ui/InstallPrompt";
import ThemeToggle from "@/components/layout/ThemeToggle";

export default function ActivityPage({
  listedActivities,
  handleEditActivity,
  handleDeleteActivity,
  toggleBookmark,
  bookmarks,
  showHeart = true,
  mutate,
  toggleTheme,
  currentTheme,
  handleShare,
}) {
  const activities = listedActivities;
  const router = useRouter();
  const { id } = router.query;
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { status, data } = useSession();
  if (status === "loading") {
    return <p>Loading session...</p>;
  }
  if (!activities) return <p>Loading...</p>;

  const activity = activities.find((activity) => activity._id === id);
  if (!activity) return <p>Activity not found</p>;

  function deleteActivity(id) {
    handleDeleteActivity(id);
  }

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  function handleDeleteClick() {
    setShowConfirm(true);
  }

  function handleConfirmDelete() {
    handleDeleteActivity(activity._id);
    setShowConfirm(false);
  }

  function handleCancelDelete() {
    setShowConfirm(false);
  }

  const isBookmarked = bookmarks?.includes(activity._id) || false;

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>

      <Header>Activity Details</Header>
      {status === "authenticated" && data.user?.id === activity.createdBy ? (
        <>
          {!showForm ? (
            <StyledSection>
              <Button onClick={() => router.back()}>
                <StyledIcon>
                  <FaArrowLeft />
                </StyledIcon>
              </Button>
              <ThemeToggle
                toggleTheme={toggleTheme}
                currentTheme={currentTheme}
              />
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
            <>
              <StyledSection>
                <ThemeToggle
                  toggleTheme={toggleTheme}
                  currentTheme={currentTheme}
                />
                <Button onClick={() => router.back()}>
                  <StyledIcon>
                    <FaArrowLeft />
                  </StyledIcon>
                </Button>
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

                <Button onClick={() => setShowForm(!showForm)}>
                  <StyledIcon>
                    <FaEdit />
                  </StyledIcon>
                </Button>
              </StyledSection>
              <ActivityForm
                handleToggleEdit={handleToggleEdit}
                handleEditActivity={(newActivity) => {
                  handleEditActivity(newActivity);
                  mutate(`/api/activities`);
                }}
                activity={activity}
              />
            </>
          )}
        </>
      ) : (
        <StyledSection>
          <Button onClick={() => router.back()}>
            <StyledIcon>
              <FaArrowLeft />
            </StyledIcon>
          </Button>
        </StyledSection>
      )}
      <ThemeToggle toggleTheme={toggleTheme} currentTheme={currentTheme} />
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
        handleShare={handleShare}
        deleteActivity={handleDeleteActivity}
        toggleBookmark={() => toggleBookmark(activity._id)}
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
  background: ${({ theme }) => theme.cardBackground};
  transition: all 0.3s ease;
`;

const StyledConfirmContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.modalOverlay};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
`;

const StyledConfirmMessage = styled.div`
  background: ${({ theme }) => theme.cardBackground};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0px 4px 12px ${({ theme }) => theme.shadow};
  border: 1px solid ${({ theme }) => theme.border};
  min-width: 300px;
  transition: all 0.3s ease;
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
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
`;
