const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/auth.middleware");

const authorizeRoles =
  require("../middleware/role.middleware");

const {
  getDoctorStats,
  getDoctorAppointments,
  updateAppointmentStatus
} = require(
  "../controllers/dashboard.doctorController"
);

router.get(
  "/stats",
  protect,
  authorizeRoles("doctor"),
  getDoctorStats
);

router.get(
  "/appointments",
  protect,
  authorizeRoles("doctor"),
  getDoctorAppointments
);

router.put(
  "/appointments/:id",
  protect,
  authorizeRoles("doctor"),
  updateAppointmentStatus
);

module.exports = router;

// Task Mahmoud