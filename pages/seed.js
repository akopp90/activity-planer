import Header from "@/components/layout/Header";
import Button from "@/components/ui/Button";
import React from "react";

function Seed() {
  const handleSeed = async () => {
    await fetch("/api/seed", { method: "POST" });
  };

  return (
    <>
      <Header>Seed</Header>
      <Button onClick={handleSeed}>Seed</Button>
    </>
  );
}

export default Seed;
