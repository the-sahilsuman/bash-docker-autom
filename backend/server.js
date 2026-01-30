const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


// =========================
// Connect DB
// =========================
connectDB();


// =========================
// Middlewares
// =========================
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// =========================
// Routes
// =========================

// ⭐ IMPORTANT — matches frontend
app.use("/tasks", taskRoutes);


// health check (DevOps best practice)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});


// =========================
// Start server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
