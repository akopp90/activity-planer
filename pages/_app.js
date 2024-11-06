import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { useRouter } from "next/router";
import { activities as activityData } from "@/lib/activities";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  const [filter, setFilter] = useState([]);
  const router = useRouter();

  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id));
    alert("deleted successfully");
    router.push("/");
  }
  function handleEditActivity(newActivity) {
    if (activities.find((activity) => activity.id === newActivity.id)) {
      setActivities(
        activities.map((activity) => {
          if (activity.id === newActivity.id) {
            return newActivity;
          }
          return activity;
        })
      );
      return;
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
        handleAddActivity={handleAddActivity}
        handleEditActivity={handleEditActivity}
        handleDeleteActivity={handleDeleteActivity}
        activities={filter.length === 0 ? activities : filteredActivities}
        handleFilter={handleFilter}
        filter={filter}
        {...pageProps}
      />
    </>
  );
}
