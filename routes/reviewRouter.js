import express from "express";

import {
  getAllReviews,
  getReviewById,
  addReview,
  deleteReviewById,
  updateReviewById,
  updateSingleAttributeById
} from "../controllers/reviewController.js";


const router = express.Router();

router.route("/").get(getAllReviews);

router.route("/:id").get(getReviewById);

router.route("/").post(addReview);

router.route("/:id").delete(deleteReviewById);

router.route("/:id").put(updateReviewById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;