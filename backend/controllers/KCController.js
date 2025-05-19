const KCQuestion = require("../models/kc.model");

exports.getKCQuestions = async (req, res) => {
  try {
    const questions = await KCQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addKCQuestion = async (req, res) => {
  try {
    const newQuestion = new KCQuestion({
      id: req.body.id,
      moduleid: req.body.moduleid,
      question: req.body.question,
      choices: req.body.choices,
      answer: req.body.answer,
    });

    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    console.error("Add KC Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateKCQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await KCQuestion.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json(updatedQuestion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteKCQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await KCQuestion.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
