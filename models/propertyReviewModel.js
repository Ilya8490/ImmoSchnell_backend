import { Schema, model } from "mongoose";

const propertyReviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  comment: String,
  rating: Number,
});

export default model("PropertyReview", propertyReviewSchema);