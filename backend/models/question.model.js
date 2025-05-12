const mongoose = require("mongoose"); // Add this line at the top

const QuestionSchema = new mongoose.Schema({
  moduleid: { type: Number, required: true },
  question: { type: String, required: true },
  choices: { type: [String], required: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.model("Question", QuestionSchema);
