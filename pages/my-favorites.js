import FavoriteActivityCard from "@/components/layout/FavoriteActivityCard";
import Header from "@/components/layout/Header";
import styled from "styled-components";

export default function MyFavoriteActivitiesPage({ bookmarks }) {
  const hasBookmarks = bookmarks.length > 0;

  return (
    <>
      <Header>My Favorites</Header>

      <Container>
        {hasBookmarks ? (
          bookmarks.map((activity) => (
            <FavoriteActivityCard key={activity.id} {...activity} />
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
`;

const NoBookmarksContainer = styled.div`
  padding: 12px;
  text-align: center;
`;