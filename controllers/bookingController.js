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

export const getAllBookings = async (req, res, next) => {
  try {
    const defaultSortBy = "checkIn";
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
    const bookings = await Booking.find().sort({[sortBy]:sortOrder}).populate([
      { path: "listing", strictPopulate: false },
    ]);
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
    console.log(newBooking)
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
