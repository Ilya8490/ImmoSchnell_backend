import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: String,
});

export default model("Review", reviewSchema);
