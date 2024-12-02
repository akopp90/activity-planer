import mongoose from "mongoose";
const { Schema } = mongoose;

const ratingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  activityId: {
    type: Schema.Types.ObjectId,
    ref: "Activity",
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    maxLength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure one rating per user per activity
ratingSchema.index({ userId: 1, activityId: 1 }, { unique: true });

export default mongoose.models.Rating || mongoose.model("Rating", ratingSchema);
