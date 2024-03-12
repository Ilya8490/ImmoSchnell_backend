import {successHandler} from "../middlewares/successHandler.js";
import {
  userNotFound,
  listingNotFound,
  checkListingCapacity,
  checkPrice,
  checkIfListingAvailable,
  bookingNotFound
} from "../middlewares/errorHandler.js";
import Booking from "../models/bookingModel.js";
import Listing from "../models/listingModel.js";
import User from "../models/userModel.js";

export const getAllBookingsOfUser = async (req, res, next) => {
  try {
    let userId = req.query.userId;
    const defaultSortBy = "checkIn";
    const defaultSortOrder = "descending";
    const sortByParam = req.query.sortBy;
    const sortOrderParam = req.query.sortOrder;
    const currentDay = Date.now();
    const filter = req.query.filter;

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

    

    let query =  Booking.find().where("user").equals(userId).sort({[sortBy]:sortOrder}).populate([
      { path: "listing", strictPopulate: false },
    ]);

    if(filter === "previous") {
      query = query.where("checkIn").lt(currentDay).where("status").equals("active")
    } else if (filter === "upcoming") {
      query = query.where("checkIn").gte(currentDay).where("status").equals("active")
    } else if (filter === "cancelled") {
      query = query.where("status").equals("cancelled")
    }

    const bookings = await query.exec()

    successHandler(res, 200, bookings);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    successHandler(res, 200, booking);
  } catch (error) {
    next(error);
  }
};

export const addBooking = async (req, res, next) => {
  try {
    const booking = req.body;
    await userNotFound(req, User);
    await listingNotFound(req, Listing);

    const listingId = booking.listing;

    const listing = await Listing.findById(listingId);
    checkListingCapacity(req, listing.numberOfBeds);
    checkPrice(req, listing.pricePerNight, booking.guestCount);
    await checkIfListingAvailable(req, Booking);

    const newBooking = await Booking.create(booking)

    successHandler(res, 200, newBooking);
 
  } catch (error) {
    next(error);
  }
};

export const deleteBookingById = async (req, res, next) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.id);
    successHandler(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    await bookingNotFound(req, Booking)
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, booking);
  } catch (error) {
    next(error);
  }
};
