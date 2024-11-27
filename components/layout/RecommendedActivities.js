import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';

const RecommendationSection = styled.section`
  padding: 2rem 1rem;
  background-color: #f5f5f5;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ActivityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem;
`;

const ActivityCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ActivityInfo = styled.div`
  padding: 1rem;
`;

const ActivityTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ActivityCategory = styled.p`
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RecommendedActivities = ({ activities = [] }) => {
  if (!activities.length) {
    return (
      <RecommendationSection>
        <SectionTitle>No Activities Available</SectionTitle>
      </RecommendationSection>
    );
  }

  return (
    <RecommendationSection>
      <SectionTitle>Recommended Activities</SectionTitle>
      <ActivityGrid>
        {activities.map((activity) => (
          <Link 
            href={`/activities/${activity.id}`} 
            key={activity.id}
            passHref
          >
            <ActivityCard>
              <Image
                src={activity.image}
                alt={activity.title}
                width={300}
                height={200}
                objectFit="cover"
                placeholder="blur"
                blurDataURL={activity.image}
              />
              <ActivityInfo>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityCategory>{activity.category}</ActivityCategory>
              </ActivityInfo>
            </ActivityCard>
          </Link>
        ))}
      </ActivityGrid>
    </RecommendationSection>
  );
};

RecommendedActivities.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RecommendedActivities;