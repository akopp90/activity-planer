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
  }
  return (
    <>
      <GlobalStyle />
      <Component
        handleAddActivity={handleAddActivity}
        handleDeleteActivity={handleDeleteActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}
