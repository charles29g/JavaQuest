const express = require("express");
const router = express.Router();
const { getModuleContents, updateModuleContent } = require("../controllers/moduleContentController");

router.get("/", getModuleContents);
router.put("/:id", updateModuleContent);

module.exports = router;
