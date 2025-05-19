const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.markModuleCompleteDirect = async (req, res) => {
  try {
    const userId = req.params.id;
    const { moduleID } = req.body;

    if (!moduleID) {
      return res.status(400).json({ error: "moduleId is required." });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!Array.isArray(user.completedModules)) {
      user.completedModules = [];
    }

    if (!user.completedModules.includes(moduleID)) {
      user.completedModules.push(moduleID);
      await user.save();
    }

    res.json({ success: true, completedModules: user.completedModules });
  } catch (err) {
    console.error("PUT /:id/completedModules error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
