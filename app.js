import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import listingRouter from "./routes/listingRouter.js";

import bookingRouter from "./routes/bookingRouter.js"
import signupRouter from "./routes/signupRouter.js"
import loginRouter from "./routes/loginRouter.js"
import usersRouter from "./routes/usersRouter.js"

import reviewRouter from "./routes/reviewRouter.js";
import paymentMethodRouter from "./routes/paymentMethodRouter.js";
import propertyReviewRouter from "./routes/propertyReviewRouter.js"


import {
  globalErrorHandler,
  routeNotFound,
} from "./middlewares/errorHandler.js";


const app = express();
const { PORT = 5000, DB_URI } = process.env;


app
  .use(cors({ origin: "http://localhost:5173", credentials: true }))
  .use(express.json())
  .use("/listings", listingRouter)
  .use("/bookings", bookingRouter)

  .use("/signup", signupRouter)
  .use("/login", loginRouter)
  .use("/users", usersRouter)

  .use("/reviews", reviewRouter)
  .use("/payment-methods", paymentMethodRouter)
  .use("/property-reviews", propertyReviewRouter)

  .use(routeNotFound)
  .use(globalErrorHandler)
  .listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose
  .connect(DB_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log("error connecting to db ", err));
