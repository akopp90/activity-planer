import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import { activities as activityData } from "@/lib/activities";
import styled from "styled-components";
import Link from "next/link";
import { FaAddressCard, FaAdjust, FaAnkh, FaAtlas, FaHome, FaWalking } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../components/ui/ToastMessage";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: activityData,
  });
  const [bookmarkedActivities, setBookmarkedActivities] = useLocalStorageState(
    "bookmarkedActivities",
    {
      defaultValue: [],
    }
  );
  const [filter, setFilter] = useState([]);
  const router = useRouter();

  function handleAddActivity(newActivity) {
    try {
      setActivities([newActivity, ...activities]);
      showToast("Activity successfully created!", "success");
    } catch {
      return showToast("something went wrong!", "error");
    }
  }

  function toggleBookmark(activityId) {
    setBookmarkedActivities((prevBookmarks) =>
      prevBookmarks.includes(activityId)
        ? prevBookmarks.filter((id) => id !== activityId)
        : [...prevBookmarks, activityId]
    );
  }

  function handleDeleteActivity(id) {
    try {
      setActivities(activities.filter((activity) => activity.id !== id));
      showToast("Activity successfully deleted!", "success");

      router.push("/");
    } catch {
      return showToast("something went wrong!", "error");
    }
  }
  function handleEditActivity(newActivity) {
    try {
      if (activities.find((activity) => activity.id === newActivity.id)) {
        setActivities(
          activities.map((activity) => {
            if (activity.id === newActivity.id) {
              showToast("Activity successfully updated!", "success");
              return newActivity;
            }
            return activity;
          })
        );
        return;
      }
    } catch {
      return showToast("something went wrong!", "error");
    }
  }

  function handleFilter(newFilter) {
    if (newFilter) {
      setFilter(
        filter.includes(newFilter)
          ? filter.filter((item) => item !== newFilter)
          : [newFilter, ...filter]
      );
    } else {
      setFilter([]);
    }
  }

  const filteredActivities = activities.filter(({ categories }) =>
    categories.some((category) => filter.includes(category))
  );

  return (
    <>
      <GlobalStyle />
      <Component
        bookmarks={bookmarkedActivities}
        toggleBookmark={toggleBookmark}
        handleAddActivity={handleAddActivity}
        handleEditActivity={handleEditActivity}
        handleDeleteActivity={handleDeleteActivity}
        activities={filter.length === 0 ? activities : filteredActivities}
        handleFilter={handleFilter}
        filter={filter}
        {...pageProps}
      />
      <ToastContainer />
      <MenuFooterContainer>
        <StyledUl>
          <StyledLi>
            <Link href="/activities">
              Activities <FaWalking />
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
