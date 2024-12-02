import { useCallback, useEffect, useMemo, useState } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import Footer from "@/components/layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../components/ui/ToastMessage";
import { SessionProvider } from "next-auth/react";
import useLocalStorageState from "use-local-storage-state";
import { filterActivities } from "@/lib/utils";
import useSWR, { mutate, SWRConfig } from "swr";
import { travelTipsCategories as travelTipsData } from "@/lib/travelTipsCategories";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "@/lib/theme";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { UserProvider } from '../context/UserContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const NUM_OF_RANDOM_ACTIVITIES = 15;
  const [theme, setTheme] = useLocalStorageState("theme", {
    defaultValue: "light",
  });
  const handleShare = useCallback((title = "Daily Adventures", description = "Check out this activity!") => {
    console.log('handleShare called with:', { title, description });
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: description,
          url: window.location.href,
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("Sharing cancelled by the user");
          } else {
            console.error("Sharing failed", error);
          }
        });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Update theme-color meta tag
    const themeColor = newTheme === "light" ? "#ffffff" : "#121212";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", themeColor);
  };
  const {
    data: initialActivities,
    error,
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
  const [randomActivities, setRandomActivities] = useState([]);

  const getRandomActivities = useCallback(
    (activities) => {
      if (!activities || activities.length === 0) {
        return [];
      }

      if (NUM_OF_RANDOM_ACTIVITIES >= activities.length) {
        return [...activities];
      }

      const randomActivitiesSet = new Set();
      while (randomActivitiesSet.size < NUM_OF_RANDOM_ACTIVITIES) {
        const randomIndex = Math.floor(Math.random() * activities.length);
        randomActivitiesSet.add(activities[randomIndex]);
      }

      return Array.from(randomActivitiesSet);
    },
    [NUM_OF_RANDOM_ACTIVITIES]
  );

  useEffect(() => {
    if (initialActivities) {
      setRandomActivities(getRandomActivities(initialActivities));
    }
  }, [initialActivities, getRandomActivities]);

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
  const [viewMode, setViewMode] = useState("Grid");
  const filteredActivities = filterActivities(initialActivities, filter || []);
  const [listedActivities, setListedActivities] = useState(
    filteredActivities || []
  );
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(true);
  useEffect(() => {
    if (Array.isArray(initialActivities)) {
      if (searchTerm) {
        const listedActivities = initialActivities.filter((activity) =>
          activity.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setListedActivities(listedActivities);
      } else {
        const filteredActivities = initialActivities.filter(
          ({ categories }) =>
            filter.length === 0 ||
            categories.some((category) => filter.includes(category))
        );
        setListedActivities(filteredActivities);
      }
    }
  }, [initialActivities, filter, searchTerm]);

  useEffect(() => {
    // Set initial theme-color meta tag
    const themeColor = theme === "light" ? "#ffffff" : "#121212";
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", themeColor);
    }
  }, [theme]);

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
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setDeferredPrompt(event);
        setShowInstallButton(true);
        setShowInstallPrompt(false);
      };

      const handleAppInstalled = () => {
        setShowInstallPrompt(false);
        setShowInstallButton(false);
        console.log("App installed");
        setDeferredPrompt(null);
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.addEventListener("appinstalled", handleAppInstalled);

      return () => {
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforeInstallPrompt
        );
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }
  }, []);

  async function handleInstallClick() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setShowInstallPrompt(false);
    }
    setDeferredPrompt(null);
  }
  function handleViewMode(mode) {
    setViewMode(mode);
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
        <UserProvider>
          <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
            <GlobalStyle />

            <Component
              {...pageProps}
              bookmarks={bookmarkedActivities}
              toggleBookmark={toggleBookmark}
              handleAddActivity={handleAddActivity}
              handleEditActivity={handleEditActivity}
              handleDeleteActivity={handleDeleteActivity}
              randomActivities={
                (filter.length === 0) & (searchTerm === "")
                  ? randomActivities
                  : listedActivities
              }
              handleResetFilter={handleResetFilter}
              filteredActivities={listedActivities}
              listedActivities={listedActivities}
              handleFilter={handleFilter}
              filter={filter}
              viewMode={viewMode}
              handleViewMode={handleViewMode}
              handleSearchInputChange={handleSearchInputChange}
              handleShare={handleShare}
              travelTipsCategories={travelTipsData}
              toggleTheme={toggleTheme}
              currentTheme={theme}
            />
            <ToastContainer />
            <Footer />
          </ThemeProvider>
        </UserProvider>
      </SessionProvider>
    </SWRConfig>
  );
}
