import { connectToDatabase } from "@/lib/db";
import Activity from "@/Models/Activity";
import { showToast } from "@/components/ui/ToastMessage";
import { activities } from "@/lib/activities";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    console.log("Attempting to insert activities");

    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = session.user.id;

    await Activity.deleteMany({});

    const activitiesWithCreatedBy = activities.map((activity) => ({
      ...activity,
      createdBy: userId,
    }));

    const result = await Activity.insertMany(activitiesWithCreatedBy);
    console.log(result);

    showToast("Activities seeded successfully", "success");
    return res.status(200).json({
      message: "Activities seeded successfully",
      count: result.length,
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return res.status(500).json({
      message: "Error seeding activities",
      error: error.toString(),
    });
  }
}
