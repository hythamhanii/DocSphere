const express = require("express");
const router = express.Router();

const protect =
  require("../middleware/auth.middleware");

const authorizeRoles =
  require("../middleware/role.middleware");

const {
  getAdminStats,
  getRecentAppointments,
  getRecentPayments
} = require(
  "../controllers/dashboard.adminController"
);

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getAdminStats
);

router.get(
  "/recent-appointments",
  protect,
  authorizeRoles("admin"),
  getRecentAppointments
);

router.get(
  "/recent-payments",
  protect,
  authorizeRoles("admin"),
  getRecentPayments
);

module.exports = router;