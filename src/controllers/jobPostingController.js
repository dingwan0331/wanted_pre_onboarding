const { CreateError } = require("../utils/exceptions");
const jobPostingService = require("../services/jobPostingService");

const postJobPostings = async (req, res, next) => {
  try {
    const { positionId, recruitmentCompensation, content, technologyStackId } =
      req.body;

    if (
      !positionId &&
      !recruitmentCompensation &&
      !content &&
      !technologyStackId
    ) {
      throw new CreateError(400, "Key Error");
    }

    const result = await jobPostingService.postJobPostings(req.body, req.user);

    res.status(201).json({ message: "Created" });
  } catch (err) {
    next(err);
  }
};

const updateJobPosting = async (req, res, next) => {
  try {
    const { positionId, recruitmentCompensation, content, technologyStackId } =
      req.body;

    if (
      !positionId &&
      !recruitmentCompensation &&
      !content &&
      !technologyStackId
    ) {
      throw new CreateError(400, "Key Error");
    }

    const jobPostingId = req.params.jobPostingId;

    const result = await jobPostingService.updateJobPosting(
      jobPostingId,
      req.body,
      req.user
    );

    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

const deleteJobPostings = async (req, res, next) => {
  try {
    const { jobPostingIds } = req.query;
    const companyId = req.user.Company.id;

    if (!jobPostingIds || jobPostingIds === "[]") {
      return res.status(204).end();
    }

    const result = await jobPostingService.deleteJobPostings(
      jobPostingIds,
      companyId
    );

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

const getJobPostings = async (req, res, next) => {
  try {
    let { offset, limit, companyName, technologyStackName, orderKey } =
      req.query;

    const result = await jobPostingService.getJobPostings(
      offset,
      limit,
      companyName,
      technologyStackName,
      orderKey
    );

    res.status(200).json({ jobPostings: result });
  } catch (err) {
    next(err);
  }
};

const getJobPosting = async (req, res, next) => {
  try {
    const { jobPostingId } = req.params;

    result = await jobPostingService.getJobPosting(jobPostingId);

    res.status(200).json({ jobPosting: result });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postJobPostings,
  updateJobPosting,
  deleteJobPostings,
  getJobPostings,
  getJobPosting,
};
