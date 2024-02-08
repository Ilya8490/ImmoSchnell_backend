import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
  },
  guestCount: Number,
  checkIn: Date,
  checkOut: Date,
  price: Number,
  status: {
    type:String,
    enum: ["pending", "active", "cancelled"],
    default:"pending",
  },
});

export default model("Booking", bookingSchema);
