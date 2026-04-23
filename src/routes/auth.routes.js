const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { registerValidator } = require("../validators/auth.validator");
const validate = require("../middleware/validationResult.middleware");

router.post(
  "/register",
  registerValidator,
  validate,
  authController.register
);

router.post("/login", authController.login);
router.post("/verify-email", authController.verifyEmail);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router;module.exports = router;