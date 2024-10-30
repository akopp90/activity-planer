import Head from "next/head";
import Header from "@/components/Header";
import ActivityList from "@/components/ActivityList";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Activity Planner</title>
      </Head>
      <Header>Activity Planner</Header>
      <ActivityList />
    </>
  );
}
