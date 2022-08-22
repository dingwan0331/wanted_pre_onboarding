const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");
const authValidator = require("../middlewares/authValidator");

router.post("", authValidator("company"), jobPostingController.postJobPostings);
router.patch(
  "/:jobPostingId",
  authValidator("company"),
  jobPostingController.updateJobPosting
);
router.delete(
  "",
  authValidator("company"),
  jobPostingController.deleteJobPostings
);
router.get("", authValidator("company"), jobPostingController.getJobPostings);
router.get(
  "/:jobPostingId",
  authValidator("company"),
  jobPostingController.getJobPosting
);

module.exports = router;
