import { Schema, model } from "mongoose";

const paymentMethodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, 'User reference is required']
  },
  nameOnCard: {
    type: String,
    required: [true, 'Name on card is required']
  },
  cardNumber: {
    type: String,
    required: [true, 'Card number is required'],
    match: [/^\d{16}$/, 'Card number must be 16 digits']
  },
  month: {
    type: Number,
    required: [true, 'Expiration month is required'],
    min: [1, 'Month must be at least 1'],
    max: [12, 'Month cannot be greater than 12']
  },
  year: {
    type: Number,
    required: [true, 'Expiration year is required'],
    min: [new Date().getFullYear(), 'Year cannot be in the past']
  },
  cvc: {
    type: Number,
    required: [true, 'CVC is required'],
    match: [/^\d{3,4}$/, 'CVC must be 3 or 4 digits']
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    required: [true, 'Card type is required'],
    enum: ['Visa', 'MasterCard', 'American Express'] 
  },
});

export default model("PaymentMethod", paymentMethodSchema);
