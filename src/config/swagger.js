const swaggerJsdoc = require(
  "swagger-jsdoc"
);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title:
        "DocSphere API",
      version: "1.0.0",
      description:
        "Doctor Appointment API"
    }
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec =
  swaggerJsdoc(options);

module.exports = swaggerSpec;