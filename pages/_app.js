import { useState, useEffect } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../components/ui/ToastMessage";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import useSWR, { mutate, SWRConfig } from "swr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const { data: initialActivities, error } = useSWR(
    `/api/activities`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    }
  );

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
  const NUM_OF_RANDOM_ACTIVITIES = 6;
  const listedActivities = searchTerm
    ? initialActivities?.filter((activity) =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : getRandomActivities(initialActivities);

  const filteredActivities = initialActivities?.filter(({ categories }) =>
    categories.some((category) => filter.includes(category))
  );

  function getRandomActivities(initialActivities) {
    if (!initialActivities) return [];
    const randomActivitiesList = [];

    if (NUM_OF_RANDOM_ACTIVITIES >= initialActivities.length) {
      return [...initialActivities];
    }

    while (randomActivitiesList.length < NUM_OF_RANDOM_ACTIVITIES) {
      const randomIndex = Math.floor(Math.random() * initialActivities.length);
      const randomActivity = initialActivities[randomIndex];

      const isAlreadyIncluded = randomActivitiesList.some(
        (activity) => randomActivity.id === activity.id
      );

      if (!isAlreadyIncluded) {
        randomActivitiesList.push(randomActivity);
      }
    }

    return randomActivitiesList;
  }

  async function handleAddActivity(newActivity) {
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });
      console.log(response);

      const createdActivity = await response.json();
      mutate("/api/activities", [...initialActivities, createdActivity], false);
      showToast("Activity successfully created!", "success");
      router.push("/");
    } catch (error) {
      console.log(error);
      showToast("Something went wrong!", "error");
    }
  }

  function toggleBookmark(activityId) {
    setBookmarkedActivities((prevBookmarks) =>
      prevBookmarks.includes(activityId)
        ? prevBookmarks.filter((id) => id !== activityId)
        : [...prevBookmarks, activityId]
    );
  }

  async function handleDeleteActivity(id) {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      });

      mutate("/api/activities");
      showToast("Activity successfully deleted!", "success");
      router.push("/");
    } catch (error) {
      showToast("Something went wrong!", "error");
    }
  }
  async function handleEditActivity(newActivity) {
    console.log(newActivity);
    try {
      const response = await fetch(`/api/activities/${newActivity._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });
      mutate("/api/activities", (activities) => {
        if (activities) {
          const updatedActivities = activities.map((activity) =>
            activity._id === newActivity._id ? newActivity : activity
          );
          return updatedActivities;
        }
        return activities;
      });
      showToast("Activity successfully updated!", "success");
    } catch (error) {
      console.log(error);
      showToast("Something went wrong!", "error");
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

  function handleSearchInputChange(event) {
    const text = event.target.value;
    setSearchTerm(text);
  }

  function handleResetFilter() {
    setSearchTerm("");
  }
  if (!initialActivities) return <div>Loading...</div>;
  if (error) return <div>Failed to load activities</div>;
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: false,
      }}
    >
      <SessionProvider session={session}>
        <GlobalStyle />
        <Component
          bookmarks={bookmarkedActivities}
          toggleBookmark={toggleBookmark}
          handleAddActivity={handleAddActivity}
          handleEditActivity={handleEditActivity}
          handleDeleteActivity={handleDeleteActivity}
          activities={
            filter.length === 0 ? initialActivities : filteredActivities
          }
          handleFilter={handleFilter}
          filter={filter}
          filteredActivities={filteredActivities}
          listedActivities={listedActivities}
          handleSearchInputChange={handleSearchInputChange}
          searchTerm={searchTerm}
          title={title}
          randomActivities={getRandomActivities}
          handleResetFilter={handleResetFilter}
          initialActivities={initialActivities}
          mutate={mutate}
          {...pageProps}
        />
        <ToastContainer />
        <Footer />
      </SessionProvider>
    </SWRConfig>
  );
}
