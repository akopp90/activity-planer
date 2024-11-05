import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
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
  return (
    <>
      <GlobalStyle />
      <Component
        handleAddActivity={handleAddActivity}
        handleEditActivity={handleEditActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}
