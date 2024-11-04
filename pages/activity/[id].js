import { useRouter } from "next/router";
import useLocalStorageState from "use-local-storage-state";
import ActivityDetails from "@/components/layout/ActivityDetails";

export default function ActivityPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data] = useLocalStorageState("activities", { defaultValue: [] });
  const activity = data.find((activity) => activity.id === id);

  if (!activity) return <p>Loading...</p>;

  return <ActivityDetails {...activity} />;
}
