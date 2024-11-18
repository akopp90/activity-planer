import ActivityCard from "@/components/layout/ActivityCard";
import Header from "@/components/layout/Header";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Search from "@/components/layout/Search";

export default function ActivityPage({
  toggleBookmark,
  bookmarks,
  deleteActivity,
  showHeart,
  handleSearchInputChange,
  listedActivities,
  title,
}) {
  

  const [showForm, setShowForm] = useState(false);


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

  return (
    <>
      <Header>Activity Planner</Header>

      <Container>
        <SloganContainer>Your new adventure starts here ...</SloganContainer>
         
         <Search onChange={handleSearchInputChange}/>
         <h2>
          {title}
        </h2>
        <ActivitiesTitle>{activity.title}</ActivitiesTitle>

        {listedActivities.length === 0 ? (
          <NoActivitiesFoundContainer>
            No Activities Found
          </NoActivitiesFoundContainer>
        ) : (
          <></>
        )}
       
        <RandomActivitiesContainer>
          {listedActivities.map((activity) => {
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
