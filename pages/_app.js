import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import { activities as activityData } from "@/lib/activities";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../components/ui/ToastMessage";
import useLocalStorageState from "use-local-storage-state";
import { filterActivities } from "@/lib/utils";

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

  const filteredActivities = filterActivities(activities, filter);

  return (
    <>
      <GlobalStyle />
      <Component
        bookmarks={bookmarkedActivities}
        toggleBookmark={toggleBookmark}
        handleAddActivity={handleAddActivity}
        handleEditActivity={handleEditActivity}
        handleDeleteActivity={handleDeleteActivity}
        activities={filteredActivities}
        handleFilter={handleFilter}
        filter={filter}
        {...pageProps}
      />
      <ToastContainer />
      <Footer />
    </>
  );
}
