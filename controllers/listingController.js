import successHandler from "../middlewares/successHandler.js";
import Listing from "../models/listingModel.js";

export const getAllListings = async (req, res, next) => {
  try {
    const listings = await Listing.find();
    successHandler(res, 200, listings);
  } catch (error) {
    next(error);
  }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};

export const addListing = async (req, res, next) => {
  try {
    const listing = req.body;
    Listing.create(listing);
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListingById = async (req, res, next) => {
  try {
    const result = await Listing.findByIdAndDelete(req.params.id);
    successHandler(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export const updateListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};
