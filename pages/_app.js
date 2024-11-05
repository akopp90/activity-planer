import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";

export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);

  return (
    <>
      <GlobalStyle />
      <Component
        activities={activities}
        setActivities={setActivities}
        {...pageProps}
      />
    </>
  );
}
