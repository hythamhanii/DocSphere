const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/auth.middleware");

const authorizeRoles =
  require("../middleware/role.middleware");

const {
  getPatientStats,
  getMyAppointments,
  cancelAppointment
} = require(
  "../controllers/dashboard.patientController"
);

router.get(
  "/stats",
  protect,
  authorizeRoles("patient"),
  getPatientStats
);

router.get(
  "/appointments",
  protect,
  authorizeRoles("patient"),
  getMyAppointments
);

router.put(
  "/appointments/:id/cancel",
  protect,
  authorizeRoles("patient"),
  cancelAppointment
);

module.exports = router;