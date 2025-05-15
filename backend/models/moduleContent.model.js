const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
  {
    moduleid: { type: Number, required: true },
    id: { type: Number, required: true },
    sectionName: { type: String, required: true },
    sectionDescription: { type: String, required: true },
    sectionImage: { type: Array, required: true },
    code: { type: String, required: true },
  },
  { collection: "moduleContentData" }
);

module.exports = mongoose.model("ModuleContentData", ModuleSchema);
