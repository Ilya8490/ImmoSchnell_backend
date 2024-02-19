import express from "express";
import usersController from "../controllers/usersController.js";
import validateSanitize from "../middlewares/validateSanitize.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.route("/")
  .get(usersController.getAllUsers) 
  .post(validateSanitize, usersController.createUser); 

router.route("/:id")
  .get(usersController.getUserById) 
  .put(validateSanitize, usersController.updateUserById) 
  .delete(usersController.deleteUserById); 

export default router;

