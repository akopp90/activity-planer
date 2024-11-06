import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  const [bookmarkedActivities, setBookmarkedActivities] = useState([]);

  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  const toggleBookmark = (activityId) => {
    let currentBookmarkedActivities = [...bookmarkedActivities];
    const toBookmarkAc = activities.find((ac) => ac.id === activityId);

    const foundActivity = currentBookmarkedActivities.find(
      (ac) => ac.id === activityId
    );

    if (!foundActivity) {
      currentBookmarkedActivities.push(toBookmarkAc);
    } else {
      currentBookmarkedActivities = currentBookmarkedActivities.filter(
        (ac) => ac.id !== activityId
      );
    }

    setBookmarkedActivities(currentBookmarkedActivities);
  };

  return (
    <>
      <GlobalStyle />

      <Component
        bookmarks={bookmarkedActivities}
        toggleBookmark={toggleBookmark}
        handleAddActivity={handleAddActivity}
        activities={activities}
        {...pageProps}
      />
      <MenuFooterContainer>
        <StyledUl>
          <StyledLi>
            <Link href="/">
              Home <FaHome />
            </Link>
          </StyledLi>
          <StyledLi>
            <Link href="/my-favorites">My Favorites</Link>
          </StyledLi>
        </StyledUl>
      </MenuFooterContainer>
    </>
  );
}

const MenuFooterContainer = styled.div`
  display: flex;
  background: white;
  box-shadow: inset 0px 0 17px -8px gray;
  width: 100vw;
  position: fixed;
  bottom: 0;
  justify-content: center;
  gap: 16px;

  a {
    text-decoration: none;
    color: #000000;
  }
`;
const StyledUl = styled.ul`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  border: solid 1px #ccc;
  height: 50px;
  width: 100%;
`;
const StyledLi = styled.li`
  border: solid 1px #ccc;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 10px;
`;
