import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";
import styled from "styled-components";
import Button from "@/components/ui/Button";
import Link from "next/link";

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
        <Button>
          <Link href="/">Home</Link>
        </Button>
        <Button>
          <Link href="/my-favorites">Bookmarks</Link>
        </Button>
      </MenuFooterContainer>
    </>
  );
}

const MenuFooterContainer = styled.div`
  display: flex;
  padding: 8px;
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
