const KCQuestion = require("../models/kc.model");

// Get all KC questions
exports.getKCQuestions = async (req, res) => {
  try {
    const questions = await KCQuestion.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new KC question
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
    console.error("Add KC Error:", err.message); // Add logging
    res.status(500).json({ error: err.message });
  }
};

// Update a KC question
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

// Delete a KC question
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

// Check KC answers
// exports.checkKCAnswers = async (req, res) => {
//   try {
//     const { answers } = req.body;
//     const results = [];
//     let score = 0;

//     for (const answer of answers) {
//       const question = await KCQuestion.findById(answer.questionId);
//       if (!question) {
//         results.push({
//           questionId: answer.questionId,
//           isCorrect: false,
//           error: "Question not found",
//         });
//         continue;
//       }

//       const isCorrect = question.correctAnswer === answer.selectedAnswer;
//       if (isCorrect) score++;

//       results.push({
//         questionId: answer.questionId,
//         isCorrect,
//         correctAnswer: question.correctAnswer,
//         explanation: question.explanation,
//       });
//     }

//     res.json({
//       score,
//       total: answers.length,
//       percentage: Math.round((score / answers.length) * 100),
//       results,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
