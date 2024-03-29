import {successHandler} from "../middlewares/successHandler.js";
import PaymentMethod from "../models/paymentMethodModel.js";

export const getAllPaymentMethodsOfUser = async (req, res, next) => {
  try {
    let userId = req.query.userId
    const paymentMethods = await PaymentMethod.find().where("user").equals(userId).exec();
    successHandler(res, 200, paymentMethods);
  } catch (error) {
    next(error);
  }
};

export const getPaymentMethodById = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findById(req.params.id);
    successHandler(res, 200, paymentMethod);
  } catch (error) {
    next(error);
  }
};

export const addPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethod = req.body;
    console.log(paymentMethod)
    PaymentMethod.create(paymentMethod);
    successHandler(res, 200, paymentMethod);
  } catch (error) {
    next(error);
  }
};

export const deletePaymentMethodById = async (req, res, next) => {
  try {
    const result = await PaymentMethod.findByIdAndDelete(req.params.id);
    successHandler(res, 200, result);
  } catch (error) {
    next(error);
  }
};

export const updatePaymentMethodById = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, paymentMethod);
  } catch (error) {
    next(error);
  }
};

export const updateSingleAttributeById = async (req, res, next) => {
  try {
    const paymentMethod = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    successHandler(res, 200, paymentMethod);
  } catch (error) {
    next(error);
  }
};
