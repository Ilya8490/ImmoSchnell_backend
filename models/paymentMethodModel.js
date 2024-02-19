import { Schema, model } from "mongoose";

const paymentMethodSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  nameOnCard: String,
  cardNumber: String,
  month: Number,
  year: Number,
  cvc: Number,
  isDefault: Boolean,
  type: String,
});

export default model("PaymentMethod", paymentMethodSchema);
