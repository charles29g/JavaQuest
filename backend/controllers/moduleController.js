// If you renamed to lowercase:
const Module = require("../models/module.model"); // Lowercase to match filename

exports.getModules = async (req, res) => {
  try {
    console.log("Fetching modules..."); // Check if the request is received
    const modules = await Module.find();
    console.log(modules); // Ensure modules are fetched correctly
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error:" + modules);
  }
};

exports.updateModule = async (req, res) => {
  const { id } = req.params; // ID of the module to update
  const updateData = req.body; // Data to update

  try {
    const updatedModule = await Module.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedModule) {
      return res.status(404).json({ error: "Module not found" });
    }
    res.json(updatedModule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addModule = async (req, res) => {
  try {
    console.log("Received request to add a module:", req.body);

    const newModule = new Module({
      id: req.body.id,
      moduleName: req.body.moduleName,
      moduleQuiz: req.body.moduleQuiz,
      img_path: req.body.img_path,
    });

    await newModule.save();

    res.status(201).json(newModule);
  } catch (err) {
    console.error("🔥 Error saving module:", err.message); // Log the actual error
    res.status(500).json({ error: err.message });
  }
};
exports.deleteModule = async (req, res) => {
  const { id } = req.params;
  
  console.log("Attempting to delete module with id:", id); // Add logging to track the ID
  
  try {
    const deletedModule = await Module.findOneAndDelete({ id: numericId });

    if (!deletedModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    res.status(200).json({
      message: "Module deleted successfully",
      deletedModule,
    });
  } catch (err) {
    console.error("🔥 Error deleting module:", err.message);
    res.status(500).json({ error: err.message });
  }
};
