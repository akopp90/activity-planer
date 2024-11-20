import { connectToDatabase as connectDB } from "@/lib/db";
import Activity from "@/Models/Activity";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const activities = await Activity.find({});
        res.status(200).json(activities);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch activities" });
      }
      break;

    case "POST":
      try {
        const activity = await Activity.create(req.body);
        res.status(201).json(activity);
      } catch (error) {
        res.status(500).json({ error: "Failed to create activity" });
      }
      break;

    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}
