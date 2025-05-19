import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { googleAuth } from "../controllers/authController.js";
import { sendOTP } from "../utils/sendOTP.js";
import OTP from "../models/otpModel.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/google", googleAuth);

router.post("/register", async (req, res) => {
  const { name, email, password, otp } = req.body;

  try {
    const matchedOTP = await OTP.findOne({ email, otp });
    if (!matchedOTP)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await OTP.deleteMany({ email });

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

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

router.post("/send-otp", async (req, res) => {
  console.log("✅ /send-otp route hit");
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    await sendOTP(email);
    res.status(200).json({ message: "OTP sent" });
  } catch (error) {
    console.error("OTP send error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

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

router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("🔐 authHeader:", authHeader);

    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    console.log("🧪 token:", token);

    console.log("JWT_SECRET is:", JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ decoded token:", decoded);

    const user = await User.findById(decoded.id).select(
      "name email role completedModules"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.error("❌ /me error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid token", detail: error.message });
  }
});

export default router;
