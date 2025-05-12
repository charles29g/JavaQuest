// If you renamed to lowercase:
const Module = require("../models/module.model"); // Lowercase to match filename

exports.getModules = async (req, res) => {
  try {
    console.log("Fetching modules...");  // Check if the request is received
    const modules = await Module.find();
    console.log(modules); // Ensure modules are fetched correctly
    res.json(modules);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error:" + modules);
  }
};

