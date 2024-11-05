import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  function handleActivity(newActivity) {
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

    setActivities([newActivity, ...activities]);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        handleActivity={handleActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}
