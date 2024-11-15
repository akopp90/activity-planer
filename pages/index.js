import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export default function ActivityPage({
  activities,
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
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
    function getRandomActivities() {
      const randomActivitiesList = [];

      if (NUM_OF_RANDOM_ACTIVITIES >= activities.length) return [...activities];

      while (randomActivitiesList.length < NUM_OF_RANDOM_ACTIVITIES) {
        const randomIndex = Math.floor(Math.random() * activities.length);
        const randomActivity = activities[randomIndex];

        const isAlreadyIncluded = randomActivitiesList.some(
          (ac) => randomActivity.id === ac.id
        );

        if (!isAlreadyIncluded) {
          randomActivitiesList.push(randomActivity);
        }
      }

      return randomActivitiesList;
    }

    setRandomActivities(getRandomActivities());
  }, [activities]);


  return (
    <>
      <Header>Activity Planner</Header>

      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>

        <SearchBarContainer>
          <SearchIconContainer>
            <FaSearch size={20} />
          </SearchIconContainer>
          <SearchInput placeholder="Search activities..." />
          <SearchButtonContainer>
            <Button isPrimary>Search</Button>
          </SearchButtonContainer>
        </SearchBarContainer>

        <ActivitiesTitle>Random Activities</ActivitiesTitle>

        <RandomActivitiesContainer>
          {randomActivities.map((activity) => {
            const isBookmarked = bookmarks?.includes(activity.id) || false;

            return (
              <ActivityCard
                key={activity.id}
                {...activity}
                deleteActivity={deleteActivity}
                toggleBookmark={() => toggleBookmark(activity.id)}
                isBookmarked={isBookmarked}
                showHeart={showHeart}
              />
            );
          })}
        </RandomActivitiesContainer>
      </Container>
    </>
  );
}

const StyledSection = styled.section`
  display: flex;
  padding: 0 24px;
  justify-content: flex-end;
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

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: solid 1px gray;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  width: 90%;
  max-width: 600px;
`;

const SearchIconContainer = styled.div`
  margin-right: 0.5rem;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
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

const SearchInput = styled.input`
  font-size: 0.9rem;
  border-radius: 0.5rem;
  outline: none;
  border: none;
  flex-grow: 1;
  padding: 0.5rem;
  width: 100%;
`;

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
