import styled from "styled-components";
import Button from "@/components/ui/Button";
import ActivityCard from "@/components/layout/ActivityCard";

export default function ActivityList({
  activities,
  bookmarks,
  toggleBookmark,
  handleFilter,
}) {
  function handleResetFilter() {
    handleFilter();
  }

  return (
    <main>
      {activities.length === 0 ? (
        <StyledSection>
          <h2>No activities found</h2>
          <Button onClick={handleResetFilter}>Reset filter</Button>
        </StyledSection>
      ) : (
        <StyledList>
          {activities.map((activity) => {
            const isBookmarked = bookmarks?.includes(activity.id) || false;

            return (
              <li key={activity.id}>
                <ActivityCard
                  {...activity}
                  isBookmarked={isBookmarked}
                  toggleBookmark={() => toggleBookmark(activity.id)}
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
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
const StyledList = styled.ul`
  gap: 16px;
  padding: 24px;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(327px, 1fr));
  margin-bottom: 50px;
`;
