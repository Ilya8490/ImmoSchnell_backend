import { Schema, model } from "mongoose";

const propertyReviewSchema = new Schema({
  booking: {
    type: Schema.Types.ObjectId,
    ref: "Booking",
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    minlength: [5, 'Comment must be at least 5 characters long'],
    maxlength: [500, 'Comment cannot be more than 500 characters long']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
});

export default model("PropertyReview", propertyReviewSchema);
