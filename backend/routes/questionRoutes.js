const express = require("express");
const router = express.Router();
const {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

// Get all questions
router.get("/", getQuestions);

// Add a new question
router.post("/", addQuestion);

// Update a question
router.put("/:id", updateQuestion);

// Delete a question
router.delete("/:id", deleteQuestion);

module.exports = router;
