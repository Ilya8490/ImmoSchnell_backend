import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User reference is required']
  },
  listing: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: [true, 'Listing reference is required']
  },
  guestCount: {
    type: Number,
    required: [true, 'Guest count is required'],
    min: [1, 'At least one guest is required']
  },
  checkIn: {
    type: Date,
    required: [true, 'Check-in date is required']
  },
  checkOut: {
    type: Date,
    required: [true, 'Check-out date is required'],
    validate: {
      validator: function(value) {
        return this.checkIn < value;
      },
      message: 'Check-out date must be after check-in date'
    }
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: ["pending", "active", "cancelled"],
    default: "pending"
  },

  favorite: Boolean
});

export default model("Booking", bookingSchema);
