import { useState, useEffect } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import { activities as activityData } from "@/lib/activities";
import Footer from "@/components/layout/Footer";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [title, setTitle] = useState("");
  const RANDOM_ACTIVITIES_TITLE = "Activities You Might Like";
  const FOUND_ACTIVITIES_TITLE = "Found Activities";
  const [listedActivities, setListedActivities] = useState([]);

  const NUM_OF_RANDOM_ACTIVITIES = 6;

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
  useEffect(() => {
    setListedActivities(getRandomActivities());
  }, [activities]);


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



  useEffect(() => {
  
    if (searchTerm !== "") {
      setTitle(FOUND_ACTIVITIES_TITLE);
    } else {
      setTitle(RANDOM_ACTIVITIES_TITLE);
      setListedActivities(getRandomActivities());
      return;
    }
    
    let filteredActivities = [...activities];

    
    filteredActivities = activities.filter((ac) => {
      
      const copiedAc = { ...ac };
      
      delete copiedAc.id;
      delete copiedAc.imageUrl;
      delete copiedAc.location;

      
      const activityString = JSON.stringify(copiedAc);

      
      return activityString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setListedActivities(filteredActivities);
  }, [searchTerm]);

  function handleSearchInputChange(event) {
    const text = event.target.value;
    setSearchTerm(text);
  }

  function handleResetFilter(){
   setSearchTerm("");
  }
  
  
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
        filteredActivities={filteredActivities}
        listedActivities={listedActivities}
        handleSearchInputChange={handleSearchInputChange}
        searchTerm={searchTerm}
        title={title}
        randomActivities={getRandomActivities}
        handleResetFilter={handleResetFilter}
        {...pageProps}
      />
      <ToastContainer />
      <Footer/>
      </>
  );
}