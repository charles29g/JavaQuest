const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    moduleid: { type: Number, required: true },
    question: { type: String, required: true },
    choices: { type: [String], required: true },
    answer: { type: String, required: true },
  },
  { collection: "KCData" }
);

module.exports = mongoose.model("KC", ModuleSchema);
