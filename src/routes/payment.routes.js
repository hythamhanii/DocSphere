const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments
} = require(
  "../controllers/paymentController"
);

const protect = require(
  "../middleware/auth.middleware"
);

router.post(
  "/",
  protect,
  createPayment
);

router.get(
  "/",
  protect,
  getPayments
);

module.exports = router;