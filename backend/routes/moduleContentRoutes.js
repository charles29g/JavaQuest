const express = require("express");
const router = express.Router();
const {
  getModuleContents,
  updateModuleContent,
  deleteModuleContent,
} = require("../controllers/moduleContentController");

router.get("/", getModuleContents);
router.put("/:id", updateModuleContent);
router.delete("/:id", deleteModuleContent);
module.exports = router;
