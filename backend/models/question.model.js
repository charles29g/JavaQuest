const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    moduleid: { type: Number, required: true },
    question: { type: String, required: true },
    choices: { type: [String], required: true },
    answer: { type: String, required: true },
  },
  { collection: "quizData" }
);

module.exports = mongoose.model("Question", QuestionSchema);
