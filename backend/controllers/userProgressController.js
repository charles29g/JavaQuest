import User from "../models/userModel.js";

// ✅ Add module ID to user's completedModules
export const markModuleComplete = async (req, res) => {
  const userId = req.user.id; // assumes middleware adds this from token
  const { moduleID } = req.body;

  if (!moduleID) {
    return res.status(400).json({ message: "moduleID is required" });
  }

  try {
    const user = await User.findById(userId);

    if (!user.completedModules.includes(moduleID)) {
      user.completedModules.push(moduleID);
      await user.save();
    }

    res.status(200).json({ message: "Module marked as completed", completedModules: user.completedModules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch user's completed modules
export const getCompletedModules = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId).select("completedModules");
    res.status(200).json({ completedModules: user.completedModules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
