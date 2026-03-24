require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

// Routes
const authRoutes = require("./src/routes/auth.routes");
const doctorRoutes = require("./src/routes/doctor.routes");
const appointmentRoutes = require("./src/routes/appointment.routes");
const paymentRoutes = require("./src/routes/payment.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");

// Error handler
const errorHandler = require(
  "./src/middleware/errorHandler.middleware"
);

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Static files (لو عندك uploads)
app.use(
  "/uploads",
  express.static("uploads")
);

// Swagger Documentation
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// API Routes
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/doctors",
  doctorRoutes
);

app.use(
  "/api/appointments",
  appointmentRoutes
);

app.use(
  "/api/payments",
  paymentRoutes
);

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// Error Middleware (لازم يكون آخر حاجة)
app.use(errorHandler);

// Server Start
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}`
  )
);