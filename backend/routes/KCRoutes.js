const express = require("express");
const router = express.Router();
const {
  getKCQuestions,
  addKCQuestion,
  updateKCQuestion,
  deleteKCQuestion,
} = require("../controllers/KCController");

// Get all KC questions
router.get("/", getKCQuestions);

// Get KC questions by module ID

// Add a new KC question
router.post("/", addKCQuestion);

// Update a KC question
router.put("/:id", updateKCQuestion);

// Delete a KC question
router.delete("/:id", deleteKCQuestion);

// Check KC answers

module.exports = router;
