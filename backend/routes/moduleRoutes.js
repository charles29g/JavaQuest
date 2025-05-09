const express = require("express");
const router = express.Router();
const { getModules } = require("../controllers/ModuleController");

router.get("/", getModules);

module.exports = router;
