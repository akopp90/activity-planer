import { showToast } from "@/components/ui/ToastMessage";
import { connectToDatabase } from "@/lib/db";
import User from "@/Models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await connectToDatabase();

    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return (
        showToast("User already exists", "error"),
        res.status(400).json({ message: "User already exists" })
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    return (
      showToast("user created successfully", "success"),
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      })
    );
  } catch (error) {
    return (
      showToast("Error creating user", "error"),
      res.status(500).json({ message: "Error creating user", error })
    );
  }
}
