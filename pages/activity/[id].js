import { useRouter } from "next/router";
import ActivityDetails from "@/components/layout/ActivityDetails";

export default function ActivityPage({ activities }) {
  const router = useRouter();
  const { id } = router.query;
  const activity = activities.find((activity) => activity.id === id);

  if (!activity) return <p>Loading...</p>;

  return <ActivityDetails {...activity} />;
}
