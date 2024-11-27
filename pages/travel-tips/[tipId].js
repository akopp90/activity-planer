import { activities } from '../../lib/activities';
import { filterActivities } from '../../utils/activityFilters';
import RecommendedActivities from '../../components/layout/RecommendedActivities';

export default function TravelTipPage({ tipId }) {
  const recommendedActivities = filterActivities(activities, tipId);

  return (
    <>
      {recommendedActivities.length > 0 && (
        <RecommendedActivities activities={recommendedActivities} />
      )}
    </>
  );
}

export async function getStaticProps({ params }) {
  return {
    props: {
      tipId: params.tipId
    }
  };
}

export async function getStaticPaths() {
  const paths = ['water-sports', 'winter-sports', 'aerial-adventure', 'outdoor-adventure'].map(id => ({
    params: { tipId: id }
  }));

  return {
    paths,
    fallback: false
  };
}
