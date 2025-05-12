const Question = require("../models/Question.model");

exports.getQuestionsByModule = async (req, res) => {
  try {
    const questions = await Question.find({ moduleid: req.params.moduleId });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
