import createError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";
import successHandler from "../middlewares/successHandler.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });

export const signup = async (req, res, next) => {
  try {
    const user = await User.create(req.body);

    const token = signToken(user._id);

    successHandler(res, 201, user, token);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError(400, "Please provide email and password");
    }

    const user = await User.findOne({ email });
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      throw createError(401, "Incorrect email or password");
    }

    const token = signToken(user._id);

    successHandler(res, 200, user, token);
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    let token =
      authorization?.startsWith("Bearer") && authorization.split(" ")[1];

    if (!token) throw createError(401, "Unauthorized request");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) throw createError(401, "Invalid token");

    const user = await User.findById(decoded.id);
    if (!user) throw createError(401, "User is no longer exist");

    next();
  } catch (error) {
    next(error);
  }
};
