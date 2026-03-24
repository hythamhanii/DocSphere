const express = require("express");
const router = express.Router();

const {
  getStats
} = require(
  "../controllers/dashboardController"
);

const protect = require(
  "../middleware/auth.middleware"
);

const authorizeRoles = require(
  "../middleware/role.middleware"
);

router.get(
  "/stats",
  protect,
  authorizeRoles("admin"),
  getStats
);

module.exports = router;