import { OAuth2Client } from "google-auth-library"; // or use require if you're not using ES modules
const client = new OAuth2Client(process.env.VITE_GOOGLE_CLIENT_ID);
import User from "../models/userModel.js"; // adjust the path to your actual model file
import jwt from "jsonwebtoken";
console.log("🔐 ENV JWT_SECRET:", process.env.JWT_SECRET);
const JWT_SECRET = process.env.JWT_SECRET;

export const googleAuth = async (req, res) => {
  const adminEmails = [
    "charlesjoseph.gutierrez.cics@ust.edu.ph",
    "aaronjoshua.bagain.cics@ust.edu.ph",
  ];
  console.log("🧪 JWT_SECRET from env:", process.env.JWT_SECRET);

  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ googleId: sub });

    const isAdmin = adminEmails.includes(email);

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        picture,
        role: isAdmin ? "admin" : "user",
      });
    }

    if (!user.role) {
      user.role = isAdmin ? "admin" : "user";
      await user.save();
    }
    console.log("JWT_SECRET is:", JWT_SECRET);
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Authentication failed" });
  }
};
