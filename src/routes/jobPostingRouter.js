const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");
const authValidator = require("../middlewares/authValidator");

router.post("", authValidator("company"), jobPostingController.posting);

module.exports = router;
