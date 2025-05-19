const express = require("express");
const router = express.Router();
const {
  getKCQuestions,
  addKCQuestion,
  updateKCQuestion,
  deleteKCQuestion,
} = require("../controllers/KCController");

router.get("/", getKCQuestions);

router.post("/", addKCQuestion);

router.put("/:id", updateKCQuestion);

router.delete("/:id", deleteKCQuestion);

module.exports = router;
