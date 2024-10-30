import styled from "styled-components";
import { activities } from "@/libs/activities";
import ActivityCard from "@/components/ActivityCard";

export default function ActivityList() {
  return (
    <StyledMain>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  gap: 16px;
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
`;
