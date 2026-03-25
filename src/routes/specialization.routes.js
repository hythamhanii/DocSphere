const express = require("express");
const router = express.Router();

const {
  createSpecialization,
  getSpecializations
} = require(
  "../controllers/specializationController"
);

router.post(
  "/",
  createSpecialization
);

router.get(
  "/",
  getSpecializations
);

module.exports = router;


// Task Mahmoud