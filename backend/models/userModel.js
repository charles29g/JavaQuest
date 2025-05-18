import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, // optional for local users
    email: { type: String, required: true, unique: true },
    password: { type: String }, // only for local users
    name: { type: String, required: true },
    picture: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    completedModules: [{ type: String }], // or Number if moduleID is numeric
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
