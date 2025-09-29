const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // parse JSON bodies

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const registrationRoutes = require("./routes/registrations");
const adminAuthRoutes = require("./routes/adminAuth"); // ⬅️ NEW

app.use("/api/auth", authRoutes);                // student login/register
app.use("/api/events", eventRoutes);             // events
app.use("/api/registrations", registrationRoutes); 
app.use("/api/admin", adminAuthRoutes);          // ⬅️ admin login

// Root route
app.get("/", (req, res) => {
  res.send("Event Registration API is running 🚀");
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
