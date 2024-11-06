import FavoriteActivityCard from "@/components/layout/FavoriteActivityCard";
import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import { FaArrowLeft } from "react-icons/fa";
import styled from "styled-components";

export default function MyFavoriteActivitiesPage({
  activities,
  bookmarks,
  toggleBookmark,
}) {
  const hasBookmarks = bookmarks.length > 0;
  const bookmarkedActivities = activities.filter((activity) =>
    bookmarks?.includes(activity.id)
  );

  return (
    <>
      <Header>My Favorites</Header>
      <Button onClick={() => window.history.back()}>
        <FaArrowLeft />
      </Button>
      <Container>
        {hasBookmarks ? (
          bookmarkedActivities.map((activity) => (
            <FavoriteActivityCard
              key={activity.id}
              {...activity}
              isBookmarked={true}
              toggleBookmark={toggleBookmark}
            />
          ))
        ) : (
          <NoBookmarksContainer>No bookmarks available...</NoBookmarksContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 16px;
  margin-bottom: 50px;
`;

const NoBookmarksContainer = styled.div`
  padding: 12px;
  text-align: center;
`;
