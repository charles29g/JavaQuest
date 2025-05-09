const mongoose = require("mongoose"); // Don't forget this import

const ModuleSchema = new mongoose.Schema({
  moduleName: { type: String, required: true },
  moduleQuiz: { type: String, required: true },
  img_path: { type: String, required: true },
});

module.exports = mongoose.model("Module", ModuleSchema);
