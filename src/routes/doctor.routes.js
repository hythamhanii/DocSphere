const express = require("express");
const router = express.Router();

const {
  createDoctorProfile,
  getAllDoctors,
  getDoctorById
} = require(
  "../controllers/doctorController"
);

const protect = require(
  "../middleware/auth.middleware"
);

const authorizeRoles = require(
  "../middleware/role.middleware"
);

router.post(
  "/",
  protect,
  authorizeRoles("doctor"),
  createDoctorProfile
);

router.get("/", getAllDoctors);

router.get("/:id", getDoctorById);

module.exports = router;