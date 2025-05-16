const express = require("express");
const router = express.Router();
const {
  getModuleContents,
  updateModuleContent,
  deleteModuleContent,
  addModuleContent
} = require("../controllers/moduleContentController");

router.get("/", getModuleContents);
router.post("/", addModuleContent);

router.put("/:id", updateModuleContent);
router.delete("/:id", deleteModuleContent);
module.exports = router;
