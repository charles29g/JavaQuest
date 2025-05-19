const User = require("../models/userModel"); // Adjust if needed
const jwt = require("jsonwebtoken");

// // Update user's completed modules
// exports.markModuleComplete = async (req, res) => {
//   try {
//     const { token, moduleId } = req.body;

//     if (!token || !moduleId) {
//       return res
//         .status(400)
//         .json({ error: "Token and moduleId are required." });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id); // or decoded._id

//     if (!user) {
//       return res.status(404).json({ error: "User not found." });
//     }

//     // Initialize modulesDone if not present
//     if (!Array.isArray(user.modulesDone)) {
//       user.modulesDone = [];
//     }

//     // Only add if not already included
//     if (!user.modulesDone.includes(moduleId)) {
//       user.modulesDone.push(moduleId);
//       await user.save();
//     }

//     res.json({ success: true, modulesDone: user.modulesDone });
//   } catch (err) {
//     console.error("Progress Update Error:", err.message);
//     res.status(500).json({ error: err.message });
//   }
// };

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
