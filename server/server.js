const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware - Dynamic CORS for production
const allowedOrigins = [
  'https://event-registration-system-nu.vercel.app',  // Your Vercel frontend
  'https://event-registration-system-nu.vercel.app/',  // With trailing slash variant
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001'
];

// Add your specific production URLs here
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
  // Also add with trailing slash variant
  if (!process.env.FRONTEND_URL.endsWith('/')) {
    allowedOrigins.push(process.env.FRONTEND_URL + '/');
  }
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Authorization'],
  maxAge: 86400 // 24 hours
}));
app.use(express.json()); // parse JSON bodies

// Handle preflight requests
app.options('*', cors()); // Enable pre-flight across-the-board

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
