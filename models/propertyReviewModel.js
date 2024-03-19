import { Schema, model } from "mongoose";

const propertyReviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String, 
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
});

export default model("PropertyReview", propertyReviewSchema);
