const express = require("express");
const router = express.Router();
const jobPostingRouter = require("./jobPostingRouter");
const applyRouter = require("./applyRouter");

router.use("/job-postings", jobPostingRouter);
router.use("/applies", applyRouter);

module.exports = router;
