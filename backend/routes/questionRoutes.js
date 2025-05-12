const express = require("express");
const router = express.Router();
const { getQuestionsByModule } = require("../controllers/questionController");

router.get("/:moduleId", getQuestionsByModule);

module.exports = router;
