const express = require("express");
const router = express.Router();
const {
  markModuleCompleteDirect,
} = require("../controllers/userProgressController");



router.put("/:id/completedModules", markModuleCompleteDirect);
module.exports = router;
