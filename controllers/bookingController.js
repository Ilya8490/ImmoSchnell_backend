import successHandler from "../middlewares/successHandler.js";
import Booking from "../models/bookingModel.js";

export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate([{path:"listing", strictPopulate:false}]);
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
      Booking.create(booking);
      successHandler(res, 200, booking);
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
      const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      successHandler(res, 200, booking);
    } catch (error) {
      next(error);
    }
  };
  