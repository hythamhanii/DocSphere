const express = require("express");
const router = express.Router();

const {
  createReview,
  getDoctorReviews
} = require(
  "../controllers/reviewController"
);

const protect = require(
  "../middleware/auth.middleware"
);

router.post(
  "/",
  protect,
  createReview
);

router.get(
  "/:doctorId",
  getDoctorReviews
);

module.exports = router;