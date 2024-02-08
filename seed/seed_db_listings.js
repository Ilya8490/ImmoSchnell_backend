import mongoose from "mongoose";
import data from "./listings.js";
import Listing from "../models/listingModel.js";
import "dotenv/config";

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    const listings = data.map((item) => new Listing(item));

    await Listing.deleteMany();
    console.log("Data Deleted successfuly");

    await Listing.insertMany(listings);
    console.log("Data seeded successfuly");
  } catch (error) {
    console.log(`Error while seeding data: ${error}`);
  } finally {
    mongoose.connection.close();
  }
})();