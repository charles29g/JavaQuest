// If you renamed to lowercase:
const Module = require("../models/module.model"); // Lowercase to match filename

exports.getModules = async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
