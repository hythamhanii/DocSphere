require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/db");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

// Routes
const authRoutes =
  require("./src/routes/auth.routes");

const doctorRoutes =
  require("./src/routes/doctor.routes");

const appointmentRoutes =
  require("./src/routes/appointment.routes");

const paymentRoutes =
  require("./src/routes/payment.routes");

const serviceRoutes =
  require("./src/routes/service.routes");

const reviewRoutes =
  require("./src/routes/review.routes");

// Dashboard Routes (الجديدة)

const adminDashboardRoutes =
  require(
    "./src/routes/dashboard-admin.routes"
  );

const doctorDashboardRoutes =
  require(
    "./src/routes/dashboard-doctor.routes"
  );

const patientDashboardRoutes =
  require(
    "./src/routes/dashboard-patient.routes"
  );

// Error handler
const errorHandler =
  require(
    "./src/middleware/errorHandler.middleware"
  );

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// Static files (uploads)
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

// API ROUTES

// Auth
app.use(
  "/api/auth",
  authRoutes
);

// Doctors
app.use(
  "/api/doctors",
  doctorRoutes
);

// Appointments
app.use(
  "/api/appointments",
  appointmentRoutes
);

// Payments
app.use(
  "/api/payments",
  paymentRoutes
);

// Services
app.use(
  "/api/services",
  serviceRoutes
);

// Reviews
app.use(
  "/api/reviews",
  reviewRoutes
);

// DASHBOARD ROUTES (Role-based)

// Admin Dashboard
app.use(
  "/api/dashboard/admin",
  adminDashboardRoutes
);

// Doctor Dashboard
app.use(
  "/api/dashboard/doctor",
  doctorDashboardRoutes
);

// Patient Dashboard
app.use(
  "/api/dashboard/patient",
  patientDashboardRoutes
);

// ERROR HANDLER (لازم يكون آخر حاجة)

app.use(errorHandler);

// SERVER START

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    `Server running on port ${PORT}`
  )
);