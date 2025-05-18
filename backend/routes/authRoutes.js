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

    await OTP.deleteMany({ email }); // clean up OTPs

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
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

// OTP route
import { sendOTP } from "../utils/sendOTP.js";
import OTP from "../models/otpModel.js";

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

export default router;
