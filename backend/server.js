require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // For serving frontend in production

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1); // Exit on failure
  }
};
connectDB();

// API Routes
app.use("/api/modules", require("./routes/moduleRoutes")); // Module endpoints
app.use("/api/questions", require("./routes/questionRoutes")); // Quiz/KC endpoints
app.use("/api/modulecontents", require("./routes/moduleContentRoutes")); // Quiz/KC endpoints
app.use("/api/jdoodle", require("./routes/JDoodleRoutes")); //Online IDE
app.use("/api/auth", require("./routes/authRoutes")); // ✅ New Google Auth

// Serve Frontend in Production (if React app is built)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
