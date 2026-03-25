const { body } = require(
  "express-validator"
);

exports.registerValidator = [
  body("firstName")
    .notEmpty()
    .withMessage(
      "First name required"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Valid email required"
    ),

  body("password")
    .isLength({ min: 6 })
    .withMessage(
      "Password must be at least 6 chars"
    )
];