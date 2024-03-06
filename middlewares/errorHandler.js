import mongoose from "mongoose";
import createError from "http-errors";


export const isValidId = (req) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw createError(400, `Invalid ID in ${req.originalUrl}`);
  }
};

export const isIdRegistered = async (req, resource) => {
  const documentInDb = await resource.findById(req.params.id);

  if (!documentInDb) {
    throw createError(404, "Document is not registered in DB");
  }
};

export const routeNotFound = (req, res, next) => {
  throw createError(404, "Route was not found");
};

export const globalErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    statusCode: err.status,
    message: err.message,
    stack: err.stack,
  });
};

export const userNotFound = async (req, userResource) => {
  const user = await userResource.findById(req.body.user);
  if (!user) {
    throw createError(404, "User does not exist");
  }
};

export const listingNotFound = async (req, listingResource) => {
  let listingId = req.params.id;
  if(!listingId) {
    listingId = req.body.listing
  }
  const listing = await listingResource.findById(listingId);
  if (!listing) {
    throw createError(404, "Listing does not exist");
  }
};


export const bookingNotFound = async (req, bookingResource) => {
  let bookingId = req.params.id;
  if(!bookingId) {
    bookingId = req.body.booking 
  }
  const booking = await bookingResource.findById(bookingId);
  if(!booking) {
    throw createError(404, "booking does not exist")
  }
  return booking;
};

export const checkIfReviewAlreadyExists = async (req, propertyReviewResource) => {
  const propertyReview = await propertyReviewResource.findOne({booking: req.body.booking});
  if(propertyReview){
    throw createError(400, "review already exists");
  }
};

export const propertyReviewNotfound = async (req, propertyReviewResource) => {
  const propertyReview = await propertyReviewResource.findById(req.params.id);
  if(!propertyReview) {
    throw createError(404, "Property review does not exist");
  }
};

export const checkListingCapacity = (req, numberOfBeds) => {
  const guestCount = req.body.guestCount;
  if (guestCount > numberOfBeds) {
    throw createError(400, "Listing does not have enough capacity");
  }
};

export const checkPrice = (req, pricePerNight) => {
  const price = req.body.price;
  const checkIn = new Date(req.body.checkIn);
  const checkOut = new Date(req.body.checkOut);
  const oneDay = 1000 * 60 * 60 * 24;

  const totalPrice =
    Math.round((checkOut.getTime() - checkIn.getTime()) / oneDay) *
    pricePerNight;
  if (price !== totalPrice) {
    throw createError(400, "Price is not correct");
  }
};

export const checkIfListingAvailable = async (req, bookingResource) => {
  const checkIn = req.body.checkIn;
  const checkOut = req.body.checkOut;
  const listingId = req.body.listing;
  const listingBookings = await bookingResource
    .find({
      $or: [
        { checkIn: { $lt: checkIn }, checkOut: { $gt: checkIn } },
        { checkIn: { $lt: checkOut }, checkOut: { $gt: checkOut } },
        { checkIn: { $gt: checkIn }, checkOut: { $lt: checkOut } },
      ],
    })
    .where("listing")
    .equals(listingId);
  if (listingBookings.length > 0) {
    throw createError(400, "Property is not available");
  }
};
