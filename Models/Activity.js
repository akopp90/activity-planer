import mongoose from "mongoose";
const { Schema } = mongoose;
import Rating from './Rating';

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: {
    address: { type: String, default: "No information." },
    lat: { type: Number },
    lon: { type: Number }
  },
  area: { type: String, default: "No information." },
  country: { type: String, default: "No information." },
  description: { type: String, default: "No information." },
  categories: { type: [String], default: [] },
  imageUrl: { type: [String], required: true },
  duration: { type: String, default: "No information." },
  numberOfPeople: { type: String, default: "No information." },
  fullDescription: { type: String, default: "No information." },
  includes: { type: [String], default: ["no information"] },
  notSuitableFor: { type: [String], default: ["no information"] },
  importantInformation: { type: [String], default: ["no information"] },
  whatToBring: { type: [String], default: ["no information"] },
  notAllowed: { type: String, default: "No information." },
  ratings: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
  averageRating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Calculate average rating before saving
activitySchema.pre('save', async function(next) {
  if (this.ratings && this.ratings.length > 0) {
    const ratings = await Rating.find({ _id: { $in: this.ratings } });
    const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    this.averageRating = totalRating / ratings.length;
    this.totalRatings = ratings.length;
  }
  next();
});

// Update timestamps before saving
activitySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Activity ||
  mongoose.model("Activity", activitySchema);
