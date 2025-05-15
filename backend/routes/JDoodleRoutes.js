// routes/JDoodleRoutes.js
const express = require("express");
const router = express.Router();

const { runCode } = require("../controllers/JDoodleController");

// POST /api/jdoodle/run
router.post("/run", runCode);

module.exports = router;
