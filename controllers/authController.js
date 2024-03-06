import createError from "http-errors";
import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

//! Helpers
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });

const removeCookies = (res, ...cookies) => {
  cookies.forEach((name) => res.clearCookie(name));
};

const createSendToken = (res, status, user) => {
  const jwtToken = signToken(user._id);

  const jwtCookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
  };

  res.cookie("jwtToken", jwtToken, jwtCookieOptions);

  user.password = undefined;

  res.status(status).json({
    success: true,
    status,
    user,
  });
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

    createSendToken(res, 200, user);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    removeCookies(res, "jwtToken");

    res.status(200).json({
      success: true,
      status: 200,
      data: "User was successfully logged out.",
    });
  } catch (error) {
    next(error);
  }
};

export const protect = async (req, res, next) => {
  try {
    let jwtToken = req.cookies["jwtToken"];
    if (!jwtToken) throw createError(401, "Unauthorized request");

    //* 2) verify token
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);

    //* 3) Check if the user is still exist
    const user = await User.findById(decoded.id);
    if (!user) throw createError(401, "User is no longer exist");

    req.user = user;
    req.isAuthenticated = true;

    next();
  } catch (error) {
    next(error);
  }
};
