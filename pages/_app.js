import { useState } from "react";
import GlobalStyle from "@/lib/styles";
import { activities as activityData } from "@/lib/activities";


export default function App({ Component, pageProps }) {
  const [activities, setActivities] = useState(activityData);
  const [bookmarks, setBookmarks] = useState([]);
  function handleAddActivity(newActivity) {
    setActivities([newActivity, ...activities]);
  }

  const toggleBookmark = (id) => {
    const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    if (updatedBookmarks.length === bookmarks.length) {
      const activityToBookmark = activities.find((activity) => activity.id === id);
      updatedBookmarks.push(activityToBookmark);
    }
    setBookmarks(updatedBookmarks);
  };


  return (
    <>
      <GlobalStyle />
      <Component 
        bookmarks={bookmarks}
        toggleBookmark={toggleBookmark}
        handleAddActivity={handleAddActivity}
        activities={activities}
        {...pageProps}
      />
    </>
  );
}  


