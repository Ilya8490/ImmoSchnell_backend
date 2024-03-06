import express from "express";

import {
  getPaymentMethodById,
  addPaymentMethod,
  deletePaymentMethodById,
  updatePaymentMethodById,
  updateSingleAttributeById,
  getAllPaymentMethodsOfUser
} from "../controllers/paymentMethodController.js";


const router = express.Router();

router.route("/").get(getAllPaymentMethodsOfUser);

router.route("/:id").get(getPaymentMethodById);

router.route("/").post(addPaymentMethod);

router.route("/:id").delete(deletePaymentMethodById);

router.route("/:id").put(updatePaymentMethodById);

router.route("/:id").patch(updateSingleAttributeById)


export default router;