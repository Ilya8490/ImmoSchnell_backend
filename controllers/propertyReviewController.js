import { successHandler } from "../middlewares/successHandler.js";
import PropertyReview from "../models/propertyReviewModel.js";
import { bookingNotFound, checkIfReviewAlreadyExists, propertyReviewNotfound } from "../middlewares/errorHandler.js";
import Booking from "../models/bookingModel.js";
import Listing from "../models/listingModel.js";

export const getAllPropertyReviews = async (req, res, next) => {
  try {
    const reviews = await PropertyReview.find().populate([
      { path: "booking", strictPopulate: false },
    ]);
    successHandler(res, 200, reviews);
  } catch (error) {
    next(error);
  }
};

export const getPropertyReviewById = async (req, res, next) => {
  try {
    const review = await PropertyReview.findById(req.params.id);
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const addPropertyReview = async (req, res, next) => {
  try {
    const review = req.body;
    const booking = await bookingNotFound(req, Booking);
    await checkIfReviewAlreadyExists(req, PropertyReview);
    const propertyReview = await PropertyReview.create(review);
    const listing = await Listing.findById(booking.listing);
    let newRating;
    let newNumberOfRatings;

    if (listing.rating) {
      newNumberOfRatings = listing.numberOfRatings + 1;
      newRating =
        (listing.rating * listing.numberOfRatings + propertyReview.rating) /
        newNumberOfRatings;
    } else {
      newRating = propertyReview.rating;
      newNumberOfRatings = 1;
    }

    listing.rating = newRating;
    listing.numberOfRatings = newNumberOfRatings;

    await Listing.findByIdAndUpdate(listing.id, listing);

    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const deletePropertyReviewById = async (req, res, next) => {
  try {
    const result = await PropertyReview.findByIdAndDelete(req.params.id);
    successHandler(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export const updatePropertyReviewById = async (req, res, next) => {
  try {
    console.log(req.query.id)
    console.log(req)
    await propertyReviewNotfound(req, PropertyReview)
    
    const review = await PropertyReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    await propertyReviewNotfound(req, PropertyReview);
    const review = await PropertyReview.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};
