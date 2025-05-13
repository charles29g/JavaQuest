const express = require("express");
const router = express.Router();
const {
  getModules,
  updateModule,
  addModule,
  deleteModule,
} = require("../controllers/moduleController");

router.get("/", getModules);

router.put("/:id", updateModule);
router.post("/", addModule);
router.delete("/:id", deleteModule);
module.exports = router;
