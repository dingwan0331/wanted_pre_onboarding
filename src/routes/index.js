const express = require("express");
const router = express.Router();
const jobPostingRouter = require("./jobPostingRouter");

router.use("/job-postings", jobPostingRouter);

module.exports = router;
