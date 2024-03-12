import express from "express";

import {
    getBookingById,
    addBooking,
    deleteBookingById,
    updateSingleAttributeById,
    getAllBookingsOfUser,

} from "../controllers/bookingController.js"

const router = express.Router();

router.route("/").get(getAllBookingsOfUser);

router.route("/:id").get(getBookingById);

router.route("/").post(addBooking);

router.route("/:id").delete(deleteBookingById);

// router.route("/:id").put(updateListingById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;