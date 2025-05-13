// If you renamed to lowercase:
const ModuleContent = require("../models/moduleContent.model"); // Lowercase to match filename

exports.getModuleContents = async (req, res) => {
  try {
    console.log("Fetching modules..."); // Check if the request is received
    const moduleContents = await ModuleContent.find();
    console.log(moduleContents); // Ensure modules are fetched correctly
    res.json(moduleContents);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error:" + moduleContents);
  }
};

exports.updateModuleContent = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedModuleContent = await ModuleContent.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    if (!updatedModuleContent) {
      console.warn("No module content found for _id:", id);
      return res.status(404).json({ error: "Module content not found" });
    }

    res.json(updatedModuleContent);
  } catch (err) {
    console.error("❌ Update failed:", err);
    res.status(500).json({ error: err.message });
  }
};
