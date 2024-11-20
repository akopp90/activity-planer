import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    address: String,
    lat: Number,
    lon: Number,
  },
  area: String,
  country: String,
  description: String,
  categories: [String],
  imageUrl: String,
  duration: String,
  numberOfPeople: String,
  fullDescription: String,
  includes: [String],
  notSuitableFor: [String],
  importantInformation: [String],
  whatToBring: [String],
  notAllowed: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Activity ||
  mongoose.model("Activity", activitySchema);
