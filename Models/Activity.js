import mongoose from "mongoose";
const { Schema } = mongoose;

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    address: { type: String, default: "No information." },
    lat: { type: Number, default: "No information." },
    lon: { type: Number, default: "No information." },
  },
  area: { type: String, default: "No information." },
  country: { type: String, default: "No information." },
  description: { type: String, default: "No information." },
  categories: { type: [String], default: [] },
  imageUrl: { type: String, default: "No information." },
  duration: { type: String, default: "No information." },
  numberOfPeople: { type: String, default: "No information." },
  fullDescription: { type: String, default: "No information." },
  includes: { type: [String], default: [] },
  notSuitableFor: { type: [String], default: [] },
  importantInformation: { type: [String], default: [] },
  whatToBring: { type: [String], default: [] },
  notAllowed: { type: String, default: "No information." },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.models.Activity ||
  mongoose.model("Activity", activitySchema);
