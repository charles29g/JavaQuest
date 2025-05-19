const Module = require("../models/module.model");

exports.getModules = async (req, res) => {
  try {
    console.log("Fetching modules...");
    const modules = await Module.find();
    console.log(modules);
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error:" + modules);
  }
};

exports.updateModule = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

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
      publish: true,
    });

    await newModule.save();

    res.status(201).json(newModule);
  } catch (err) {
    console.error("🔥 Error saving module:", err.message);
    res.status(500).json({ error: err.message });
  }
};
exports.deleteModule = async (req, res) => {
  const { id } = req.params;

  console.log("Attempting to delete module with id:", id);

  try {
    const deletedModule = await Module.findByIdAndDelete(id);

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
