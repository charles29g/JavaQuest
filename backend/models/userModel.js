import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: String,
    name: String,
    picture: String,
    role: { type: String, enum: ["admin", "user"], default: "user" }, // 👈 NEW
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
