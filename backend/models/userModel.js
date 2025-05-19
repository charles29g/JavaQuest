const mongoose = require("mongoose"); 

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, unique: true, sparse: true }, 
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    name: { type: String, required: true },
    picture: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    completedModules: [{ type: Number }], 
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
