import { useRouter } from "next/router";
import styled from "styled-components";
import { activities } from "@/lib/activities"; 
import Link from "next/link";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  const activity = activities.find(activity => activity.id === id);

  if (!activity) return <p>Loading...</p>;



  return (
    <StyledDetails>
      <StyledImage src={activity.imageUrl} alt={activity.title} />
      <StyledTitle>{activity.title}</StyledTitle>
      <StyledList>
        {activity.categories.map(category => (
          <StyledListItem key={category}>{category}</StyledListItem>
        ))}
      </StyledList>
      <StyledLocation>{activity.area}, {activity.country}</StyledLocation>
      <StyledDescription>{activity.description}</StyledDescription>
      <Link href="/" title="Back to Activities">Back to Activities</Link>
    </StyledDetails>
  );
}

const StyledDetails = styled.div`
  padding: 16px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  border-radius: 8px;
`;

const StyledTitle = styled.h2`
  font-size: 1.5rem;
  margin: 16px 0;
`;

const StyledList = styled.ul`
  display: flex;
  list-style: none;
  gap: 8px;
  margin: 16px 0;
`;

const StyledListItem = styled.li`
  padding: 4px 8px;
  border-radius: 4px;
  background-color: #f1f1f1;
`;

const StyledLocation = styled.p`
  color: #666;
  margin: 8px 0 16px;
  display: flex;
  justify-content: flex-end;

`;

const StyledDescription = styled.p`
  margin: 16px 0;
`;

const StyledBackButton = styled.button`
  padding: 8px 16px;
  background-color: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #005bb5;
  }
`;

