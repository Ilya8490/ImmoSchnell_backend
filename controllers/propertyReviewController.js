import {successHandler} from "../middlewares/successHandler.js";
import PropertyReview from "../models/propertyReviewModel.js";

export const getAllPropertyReviews = async (req, res, next) => {
  try {
    const reviews = await PropertyReview.find().populate([{path:"booking", strictPopulate:false}]);
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
    PropertyReview.create(review);
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
    const review = await PropertyReview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    const review = await PropertyReview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, review);
  } catch (error) {
    next(error);
  }
};
