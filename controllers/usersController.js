import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import successHandler from "../middlewares/successHandler.js";
import { isValidId } from "../middlewares/errorHandler.js";

const usersController = {
  async createUser(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 8);
      const user = new User({
        ...req.body,
        password: hashedPassword,
      });

      const savedUser = await user.save();
      successHandler(res, 201, savedUser);
    } catch (error) {
      if (error.code === 11000) {
        return next(new Error('Email already in use'));
      }
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await User.find();
      successHandler(res, 200, users);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      isValidId(req);
      const user = await User.findById(req.params.id);
      successHandler(res, 200, user);
    } catch (error) {
      next(error);
    }
  },

  deleteAllUsers: async (req, res, next) => {
    try {
      const deleteConfirm = await User.deleteMany();
      successHandler(res, 200, deleteConfirm);
    } catch (error) {
      next(error);
    }
  },

  updateUserById: async (req, res, next) => {
    try {
      isValidId(req);
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      successHandler(res, 200, user);
    } catch (error) {
      next(error);
    }
  },

  deleteUserById: async (req, res, next) => {
    try {
      isValidId(req);
      const user = await User.findByIdAndDelete(req.params.id);
      successHandler(res, 200, user);
    } catch (error) {
      next(error);
    }
  },
  
};

export default usersController;
