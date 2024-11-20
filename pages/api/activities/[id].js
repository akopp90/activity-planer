import { connectToDatabase as connectDB } from "@/lib/db";
import Activity from "@/Models/Activity";

export default async function handler(req, res) {
  const { id } = req.query;
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const activity = await Activity.findById(id);
        if (!activity) {
          return res.status(404).json("Activity not found");
        }
        res.status(200).json(activity);
      } catch (error) {
        res.status(500).json("Failed to fetch activity");
      }
      break;

    case "PUT":
      try {
        const activity = await Activity.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!activity) {
          return res.status(404).json("Activity not found");
        }
        res.status(200).json(activity);
      } catch (error) {
        console.error(error); // log the error to the console
        res
          .status(500)
          .json({ error: "Failed to update activity", message: error.message });
      }
      break;

    case "DELETE":
      try {
        const activity = await Activity.findByIdAndDelete(id);
        if (!activity) {
          return res.status(404).json("Activity not found");
        }
        res.status(200).json("Activity deleted successfully");
      } catch (error) {
        res.status(500).json("Failed to delete activity");
      }
      break;

    default:
      res.status(405).json("Method not allowed");
  }
}
