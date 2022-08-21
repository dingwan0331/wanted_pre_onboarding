const express = require("express");
const router = express.Router();
const applyController = require("../controllers/applyController");
const authValidator = require("../middlewares/authValidator");

router.post("", authValidator("general"), applyController.postApply);

module.exports = router;
