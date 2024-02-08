import { Schema, model } from "mongoose";

const listingSchema = new Schema({
  name: String,
  streetName: String,
  apartmentNumber: String,
  postalCode: String,
  state: String,
  city: String,
  country: String,
  roomType: String,
  numberOfBedrooms: Number,
  numberOfBeds:Number,
  numberOfBathrooms: Number,
  pricePerNight: Number,
  selfCheckIn: Boolean,
  allowPets: Boolean,
  accessibilityFeatures: Boolean,
  smokingAllowed: Boolean,
  childrenAllowed: Boolean,
  description: String,
  rating: Number,
  images: [
    {
      name: String,
      url: String,
    },
  ],
  attributes: [
    {
      name: String,
      value: Boolean,
    },
  ],
  owner: String,
});

export default model("Listing", listingSchema);

