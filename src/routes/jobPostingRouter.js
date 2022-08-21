const express = require("express");
const router = express.Router();
const jobPostingController = require("../controllers/jobPostingController");
const authValidator = require("../middlewares/authValidator");

router.post("", authValidator("company"), jobPostingController.posting);
router.patch(
  "/:jobPostingId",
  authValidator("company"),
  jobPostingController.update
);
router.delete("", authValidator("company"), jobPostingController.remove);
router.get("", authValidator("company"), jobPostingController.getJobPostings);
router.get(
  "/:jobPostingId",
  authValidator("company"),
  jobPostingController.getJobPosting
);

module.exports = router;
