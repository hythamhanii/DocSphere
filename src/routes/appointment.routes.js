const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  updateAppointmentStatus
} = require(
  "../controllers/appointmentController"
);

const protect = require(
  "../middleware/auth.middleware"
);

router.post(
  "/",
  protect,
  createAppointment
);

router.get(
  "/my",
  protect,
  getMyAppointments
);

router.put(
  "/:id/status",
  protect,
  updateAppointmentStatus
);

module.exports = router;