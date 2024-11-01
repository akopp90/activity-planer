import styled from "styled-components";
import { activities } from "@/lib/activities";
import ActivityCard from "@/components/ActivityCard";

export default function ActivityList() {
  return (
    <main>
      <StyledList>
        {activities.map((activity) => (
          <li key={activity.id}>
            <ActivityCard {...activity} />
          </li>
        ))}
      </StyledList>
    </main>
  );
}

const StyledList = styled.ul`
  gap: 16px;
  padding: 24px;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(auto-fill, minmax(327px, 1fr));
`;
