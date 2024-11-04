import ActivityDetails from "@/components/ActivityDetails";
import { useRouter } from "next/router";
import { activities } from "@/lib/activities";


export default function ActivityPage() {
  const router = useRouter();
  const { id } = router.query;

  const activity = activities.find(activity => activity.id === id);

  if (!activity) return <p>Loading...</p>;
  
  return <ActivityDetails activity={activity} />;
}

  
