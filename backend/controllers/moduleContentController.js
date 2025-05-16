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

exports.deleteModuleContent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedModuleContent = await ModuleContent.findByIdAndDelete(id);

    if (!deletedModuleContent) {
      return res.status(404).json({ error: "Module content not found" });
    }

    res.status(200).json({ message: "Module content deleted successfully" });
  } catch (err) {
    console.error("❌ Delete failed:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.addModuleContent = async (req, res) => {
  try {
    const newContent = new ModuleContent(req.body);
    const savedContent = await newContent.save();
    console.log("Module content created:", savedContent);
    res.status(201).json(savedContent);
  } catch (err) {
    console.error("❌ Create failed:", err);
    res.status(500).json({ error: err.message });
  }
};
