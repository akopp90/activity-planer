import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }
  return (
    <>
      <GlobalStyle />
      <Component
        handleAddActivity={handleAddActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}
