import styled from "styled-components";
import Button from "@/components/ui/Button";
import ActivityCard from "@/components/layout/ActivityCard";

export default function ActivityList({
  activities,
  bookmarks,
  toggleBookmark,
  handleResetFilter,
  showHeart = true,
  viewMode,
}) {
  if (!activities) return <div>Loading...</div>;
  return (
    <main>
      {activities?.length === 0 ? (
        <StyledSection>
          <h2>No activities found</h2>
          <Button onClick={handleResetFilter}>Reset filter</Button>
        </StyledSection>
      ) : (
        <StyledList $viewMode={viewMode}>
          {activities.map((activity) => {
            const isBookmarked = bookmarks?.includes(activity._id) || false;

            return (
              <li key={activity._id}>
                <ActivityCard
                  {...activity}
                  viewMode={viewMode}
                  toggleBookmark={() => toggleBookmark(activity._id)}
                  isBookmarked={isBookmarked}
                  showHeart={showHeart}
                />
              </li>
            );
          })}
        </StyledList>
      )}
    </main>
  );
}

const StyledSection = styled.section`
  gap: 16px;
  padding: 24px;
  display: flex;
  margin-top: 24px;
  border-radius: 8px;
  margin-inline: auto;
  flex-direction: column;
  align-items: flex-start;
  background-color: #f1f1f1;
`;

const StyledList = styled.ul`
  gap: 16px;
  padding: 24px;
  display: grid;
  list-style: none;
  position: relative;
  margin-bottom: 50px;
  grid-template-columns: ${(props) =>
    props.$viewMode === "Grid"
      ? "repeat(auto-fill, minmax(327px, 1fr))"
      : "none"};
`;
