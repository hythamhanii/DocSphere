const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { 
  registerValidator, 
  loginValidator, 
  forgotPasswordValidator, 
  resetPasswordValidator 
} = require("../validators/auth.validator");
const validate = require("../middleware/validationResult.middleware");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post(
  "/login",
  loginValidator,
  validate,
  authController.login
);

router.post("/verify-email", authController.verifyEmail);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

// Password reset routes
router.post(
  "/forgot-password",
  forgotPasswordValidator,
  validate,
  authController.forgotPassword
);

router.post(
  "/reset-password",
  resetPasswordValidator,
  validate,
  authController.resetPassword
);

module.exports = router;