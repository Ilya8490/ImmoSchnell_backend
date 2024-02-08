import express from "express";

import {
  getAllListings,
  getListingById,
  addListing,
  deleteListingById,
  updateListingById,
  updateSingleAttributeById
} from "../controllers/listingController.js";


const router = express.Router();

router.route("/").get(getAllListings);

router.route("/:id").get(getListingById);

router.route("/").post(addListing);

router.route("/:id").delete(deleteListingById);

router.route("/:id").put(updateListingById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;