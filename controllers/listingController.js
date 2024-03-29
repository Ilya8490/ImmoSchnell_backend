import {
  successHandler,
  paginatedSuccessHandler,
} from "../middlewares/successHandler.js";
import { listingNotFound, userNotFound } from "../middlewares/errorHandler.js";
import Listing from "../models/listingModel.js";
import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";

export const getAllListings = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const defaultSortBy = "rating";
    const defaultSortOrder = "descending";
    const sortByParam = req.query.sortBy;
    const sortOrderParam = req.query.sortOrder;
    let sortBy;
    let sortOrder;

    if (sortByParam) {
      if (sortOrderParam) {
        sortOrder = sortOrderParam;
      } else {
        sortOrder = defaultSortOrder;
      }
      sortBy = sortByParam;
    } else {
      sortBy = defaultSortBy;
      sortOrder = defaultSortOrder;
    }

    let listings;
    let query = Listing.find();
    const guestCount = req.query.guestCount;
    const destination = req.query.destination;
    // date format : YYYY-MM-DD
    const checkIn = req.query.checkIn;
    const checkOut = req.query.checkOut;
    if (guestCount) {
      query = query.where("numberOfBeds").gte(guestCount);
    }

    if (destination) {
      query = query.or([
        { city: { $regex: new RegExp(destination, "i") } },
        { country: { $regex: new RegExp(destination, "i") } },
        { state: { $regex: new RegExp(destination, "i") } },
      ]);
    }

    const bookedListings = await Booking.find({
      $or: [
        { checkIn: { $lt: checkIn }, checkOut: { $gt: checkIn } },
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkOut } },
        { checkIn: { $gt: checkIn }, checkOut: { $lt: checkOut } },
      ],
    }).distinct("listing");
    query = query.where("_id").nin(bookedListings);

    query = query.sort({ [sortBy]: sortOrder });
    const totalListingCount = await Listing.countDocuments(
      query
    ).exec();

    if (page && limit) {
      query = query.skip((page - 1) * limit).limit(limit);
    }

    listings = await query.exec();

    paginatedSuccessHandler(res, 200, listings, totalListingCount);
  } catch (error) {
    next(error);
  }
};

export const getAllListingsOfUser = async (req, res, next) => {
  try {
    const { limit, page } = req.query;
    const sortBy = "name";
    const sortOrder = "ascending";
    const userId = req.params.id

    let listings;
    let query = Listing.find().where("user").equals(userId);

    query = query.sort({ [sortBy]: sortOrder });

    const totalListingCount = await Listing.countDocuments(
      query
    ).exec();
   
    if (page && limit) {
      query = query.skip((page - 1) * limit).limit(limit);
    }
   
    listings = await query.exec();

   
 

    paginatedSuccessHandler(res, 200, listings, totalListingCount);
  } catch (error) {
    next(error);
  }
};


export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate([
      { path: "user", strictPopulate: false },
    ]);
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};

export const addListing = async (req, res, next) => {
  try {
    const listing = req.body;
    await userNotFound(req, User);
    const correctedListing = {
      ...listing,
      name: listing.name.charAt(0).toUpperCase() + listing.name.slice(1),
    };
    Listing.create(correctedListing);
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
    await listingNotFound(req, Listing);
    console.log(req);
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
    await listingNotFound(req, Listing);
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, listing);
  } catch (error) {
    next(error);
  }
};
