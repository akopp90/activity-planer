import Head from "next/head";
import Header from "@/components/layout/Header";
import useLocalStorageState from "use-local-storage-state";
import ActivityList from "@/components/layout/ActivityList";
import { activities as activityData } from "@/lib/activities";

export default function HomePage() {
  const [activities, setActivities] = useLocalStorageState("activities", {
    defaultValue: activityData,
  });

  function handleActivities(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>
      <ActivityList
        handleActivities={handleActivities}
        activities={activities}
      />
    </>
  );
}
