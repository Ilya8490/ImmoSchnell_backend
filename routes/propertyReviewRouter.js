import express from "express";

import {
  getAllPropertyReviews,
  getPropertyReviewById,
  addPropertyReview,
  deletePropertyReviewById,
  updatePropertyReviewById,
  updateSingleAttributeById
} from "../controllers/propertyReviewController.js";


const router = express.Router();

router.route("/").get(getAllPropertyReviews);

router.route("/:id").get(getPropertyReviewById);

router.route("/").post(addPropertyReview);

router.route("/:id").delete(deletePropertyReviewById);

router.route("/:id").put(updatePropertyReviewById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;