import { useEffect, useState } from "react";
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
  const NUM_OF_RANDOM_ACTIVITIES = 6;
  const {
    data: initialActivities,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `/api/activities`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }
      return response.json();
    },
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
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

  const [previousActivities, setPreviousActivities] = useState(null);
  const [listedActivities, setListedActivities] = useState(initialActivities);
  const filteredActivities = Array.isArray(initialActivities)
    ? initialActivities.filter(({ categories }) =>
        categories.some((category) => filter.includes(category))
      )
    : [];
  useEffect(() => {
    if (searchTerm) {
      setListedActivities(
        initialActivities?.filter((activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      const filteredActivities = initialActivities?.filter(
        ({ categories }) =>
          filter.length === 0 ||
          categories.some((category) => filter.includes(category))
      );
      setListedActivities(filteredActivities);
    }
  }, [searchTerm, initialActivities, filter]);

  async function handleAddActivity(newActivity) {
    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });

      const createdActivity = await response.json();
      mutate("/api/activities", [...initialActivities, createdActivity], false);
      showToast("Activity successfully created!", "success");
      router.push("/");
    } catch (error) {
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
            filter.length === 0 ? initialActivities : listedActivities
          }
          handleFilter={handleFilter}
          filter={filter}
          filteredActivities={listedActivities}
          listedActivities={listedActivities} // Pass listedActivities as a prop
          handleSearchInputChange={handleSearchInputChange}
          searchTerm={searchTerm}
          title={title}
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
