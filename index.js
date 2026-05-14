require("dotenv").config();

const express = require("express");

const helmet = require("helmet");

const swaggerUi = require("swagger-ui-express");

const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(helmet());

// Routes
const authRoutes = require("./routes/auth");

const eventRoutes = require("./routes/event");

const statsRoutes = require("./routes/stats");

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/stats", statsRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Event API Running",
  });
});

// Swagger Config
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Event API",
      version: "1.0.0",
    },

    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },

  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON
app.get("/api-docs-json", (req, res) => {
  res.setHeader("Content-Type", "application/json");

  res.send(swaggerSpec);
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
