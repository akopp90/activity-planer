import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";
import { FaKey, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/layout/LogoutButton";

export default function ActivityPage({
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
  handleSearchInputChange,
  listedActivities,
  title,
  activities,
  initialActivities,
  mutate,
}) {
  const [showForm, setShowForm] = useState(false);

  const [showFilter, setShowFilter] = useState(false);
  const { data: session } = useSession();

  const activity = {
    id: "",
    title: "",
    categories: [],
    area: "",
    country: "",
    description: "",
    imageUrl: "",
    includes: { title: "", text: "" },
    notSuitableFor: { title: "", text: "" },
    importantInformation: { title: "", text: "" },
    whatToBring: { title: "", text: "" },
    notAllowed: { title: "", text: "" },
  };

  function handleToggleEdit() {
    setShowForm(!showForm);
  }

  const [randomActivities, setRandomActivities] = useState([]);
  const NUM_OF_RANDOM_ACTIVITIES = 6;

  useEffect(() => {
    if (initialActivities) {
      getRandomActivities();
    }
  }, [initialActivities]);

  function getRandomActivities() {
    if (NUM_OF_RANDOM_ACTIVITIES >= activities.length) return [...activities];

    const randomActivitiesList = [];

    while (randomActivitiesList.length < NUM_OF_RANDOM_ACTIVITIES) {
      const randomIndex = Math.floor(Math.random() * activities.length);
      const randomActivity = activities[randomIndex];

      const isAlreadyIncluded = randomActivitiesList.some(
        (activity) => randomActivity._id === activity._id
      );

      if (!isAlreadyIncluded) {
        randomActivitiesList.push(randomActivity);
      }
    }

    setRandomActivities(randomActivitiesList);
  }

  return (
    <>
      <Header>Activity Planner</Header>
      {!session ? (
        <StyledLink href="/auth/signin">
          <FaKey />
        </StyledLink>
      ) : (
        <LogoutContainer>
          <LogoutButton />
        </LogoutContainer>
      )}
      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>

        <Search onChange={(event) => handleSearchInputChange(event)} />
        <h2>{title}</h2>
        <h3>
          you habe to be registered to add activities and only can delete and
          edit your own activities.
        </h3>
        <p>User: test@test123.com Password: test12345</p>
        <ActivitiesTitle>{activity.title}</ActivitiesTitle>

        {Array.isArray(listedActivities) && listedActivities.length === 0 ? (
          <NoActivitiesFoundContainer>
            No Activities Found
          </NoActivitiesFoundContainer>
        ) : (
          <></>
        )}

        {listedActivities && listedActivities.length > 0 && (
          <ActivitiesContainer>
            {listedActivities.map((activity) => {
              const isBookmarked = bookmarks?.includes(activity._id) || false;

              return (
                <ActivityCard
                  key={activity._id}
                  {...activity}
                  deleteActivity={deleteActivity}
                  toggleBookmark={() => toggleBookmark(activity._id)}
                  isBookmarked={isBookmarked}
                  showHeart={showHeart}
                />
              );
            })}
          </ActivitiesContainer>
        )}

        {!listedActivities ||
          (listedActivities.length === 0 && (
            <RandomActivitiesContainer>
              {randomActivities.map((activity) => {
                const isBookmarked = bookmarks?.includes(activity._id) || false;

                return (
                  <ActivityCard
                    key={activity._id}
                    {...activity}
                    deleteActivity={deleteActivity}
                    toggleBookmark={() => toggleBookmark(activity._id)}
                    isBookmarked={isBookmarked}
                    showHeart={showHeart}
                  />
                );
              })}
            </RandomActivitiesContainer>
          ))}
      </Container>
    </>
  );
}
const ActivitiesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  width: 100%;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  gap: 32px;
`;

const SloganContainer = styled.section`
  font-size: 1.5rem;
  text-align: center;
`;

const ActivitiesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 24px;
  margin-bottom: 16px;
  color: #333;
  text-align: left;
  width: 100%;
  padding-left: 16px;
`;

const NoActivitiesFoundContainer = styled.div``;

const RandomActivitiesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  width: 100%;
  margin-bottom: 50px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
const StyledLink = styled(Link)`
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  font-size: 16px;
  position: absolute;
  top: 80px;
  right: 24px;
`;
const LogoutContainer = styled.div`
  position: absolute;
  top: 80px;
  right: 24px;
`;
