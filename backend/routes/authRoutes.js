import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js"; // Use your updated unified model
import jwt from "jsonwebtoken";
import { googleAuth } from "../controllers/authController.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret";

// Google route
router.post("/google", googleAuth);

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Incoming register request:", { name, email });

  try {
    if (!name || !email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User created:", newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Create JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Mark a module as complete
router.post("/complete-module", async (req, res) => {
  const { token, moduleID } = req.body;

  if (!token || !moduleID) {
    return res.status(400).json({ message: "Token and moduleID are required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.completedModules?.includes(moduleID)) {
      user.completedModules = user.completedModules || [];
      user.completedModules.push(moduleID);
      await user.save();
    }

    res.status(200).json({
      message: "Module marked as completed",
      completedModules: user.completedModules,
    });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

// ✅ Get completed modules
router.post("/completed-modules", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("completedModules");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ completedModules: user.completedModules });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
