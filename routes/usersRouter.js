import express from "express";

import { login, signup, getAllUsers } from "../controllers/usersController.js";
import validateSanitize from "../middlewares/validateSanitize.js";

const router = express.Router();

router
  .get("/", getAllUsers)
  .post("/signup", validateSanitize, signup)
  .post("/login", validateSanitize, login);

export default router;