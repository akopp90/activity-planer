import { useState } from "react";
import Button from "@/components/ui/Button";
import Header from "@/components/layout/Header";
import { useSession } from "next-auth/react";

export default function SeedPage() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSeed() {
    setIsLoading(true);
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header>Seed Database</Header>
      <Button onClick={handleSeed} disabled={isLoading} isPrimary>
        {isLoading ? "Seeding..." : "Seed Activities"}
      </Button>
    </>
  );
}
