import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ActivityPage({ activities, toggleBookmark }) {
  const [randomActivities, setRandomActivities] = useState([]);
  const NUM_OF_RANDOM_ACTIVITIES = 5;

  useEffect(() => {
    const randomActivities = getRandomActivities();
    setRandomActivities(randomActivities);
  }, []);

  function getRandomActivities() {
    const randomActivities = [];

    if (NUM_OF_RANDOM_ACTIVITIES >= activities.length) return [...activities];

    while (randomActivities.length < NUM_OF_RANDOM_ACTIVITIES) {
      const randomIndex = Math.floor(Math.random() * activities.length); 
      const randomActivity = activities[randomIndex];

      const isAlreadyIncluded = randomActivities.some(
        (ac) => randomActivity.id === ac.id
      );

      if (!isAlreadyIncluded) {
        randomActivities.push(randomActivity); 
      }
    }

    return randomActivities;
  }

  return (
    <>
      <Header>Activity Planner</Header>

      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>

        <SearchContainer>
          <SearchInput />

          <SearchButtonContainer>
            <Button isPrimary>Suchen</Button>
          </SearchButtonContainer>
        </SearchContainer>

        <RandomActivitiesContainer>
          {randomActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              toggleBookmark={() => toggleBookmark(activity.id)}
              showHeart={false}
            />
          ))}
        </RandomActivitiesContainer>
      </Container>
    </>
  );
}

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

const SearchContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  justify-self: center;
  width: 90%;
`;

const SearchButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
`;

const SearchInput = styled.input`
  font-size: 1.25rem;
  border-radius: 0.5rem;
  outline: none;
  border: solid 1px gray;
  padding: 0.5rem;
`;

const RandomActivitiesContainer = styled.div`
  display: grid;
  gap: 0.5rem;

  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1050px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
