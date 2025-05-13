const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    moduleName: { type: String, required: true },
    moduleQuiz: { type: String, required: true },
    img_path: { type: String, required: true },
  },
  { collection: "moduleData" }
);

module.exports = mongoose.model("Module", ModuleSchema);
