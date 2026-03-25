const express = require("express");
const router = express.Router();

const {
  createService,
  getServices,
  deleteService
} = require(
  "../controllers/serviceController"
);

const protect = require(
  "../middleware/auth.middleware"
);

router.post(
  "/",
  protect,
  createService
);

router.get(
  "/",
  getServices
);

router.delete(
  "/:id",
  protect,
  deleteService
);

module.exports = router;