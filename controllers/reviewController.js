import {successHandler} from "../middlewares/successHandler.js";
import Review from "../models/reviewModel.js";

export const getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    successHandler(res, 200, reviews);
  } catch (error) {
    next(error);
  }
};

export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const addReview = async (req, res, next) => {
  try {
    const review = req.body;
    Review.create(review);
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const deleteReviewById = async (req, res, next) => {
  try {
    const result = await Review.findByIdAndDelete(req.params.id);
    successHandler(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export const updateReviewById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};
