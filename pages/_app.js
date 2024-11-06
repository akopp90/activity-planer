import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  const router = useRouter();
  function handleDeleteActivity(id) {
    setActivities(activities.filter((activity) => activity.id !== id));
    alert("deleted successfully");
    router.push("/");
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
        handleDeleteActivity={handleDeleteActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}
