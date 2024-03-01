import { check, validationResult } from "express-validator";
import createError from "http-errors";

const validateSanitize = [
  check("firstName").trim().escape(),
  check("lastName").trim().escape(),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail()
    .escape(),
    
  check("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  
  check("dateOfBirth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isDate()
    .withMessage("Date of birth must be a valid date")
    .trim()
    .escape(),

  check("phone")
    .notEmpty()
    .withMessage("Telephone number is required")
    .matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
    .withMessage("Invalid telephone number format")
    .trim()
    .escape(),

    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // Send all error messages
        const extractedErrors = errors.array().map(err => err.msg);
        return next(createError(422, extractedErrors.join(", ")));
      }
      next();
    },
];

export default validateSanitize;
