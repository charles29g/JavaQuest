import "./config.js";
import userRoutes from "./routes/userRoutes.js";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import moduleRoutes from "./routes/moduleRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import moduleContentRoutes from "./routes/moduleContentRoutes.js";
import JDoodleRoutes from "./routes/JDoodleRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import kcRoutes from "./routes/KCRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};
connectDB();

app.use("/api/modules", moduleRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/modulecontents", moduleContentRoutes);
app.use("/api/jdoodle", JDoodleRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/kc", kcRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
