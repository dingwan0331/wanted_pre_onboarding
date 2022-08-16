const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");

router.post("", jobPostingController.posting);

module.exports = router;
