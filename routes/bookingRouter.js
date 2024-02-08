import express from "express";

import {
    getAllBookings,
    getBookingById,
    addBooking,
    deleteBookingById,
    updateSingleAttributeById,

} from "../controllers/bookingController.js"

const router = express.Router();

router.route("/").get(getAllBookings);

router.route("/:id").get(getBookingById);

router.route("/").post(addBooking);

router.route("/:id").delete(deleteBookingById);

// router.route("/:id").put(updateListingById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;