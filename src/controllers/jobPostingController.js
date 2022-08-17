const { CreateError } = require("../utils/exceptions");
const jobPostingService = require("../services/jobPostingService");

const posting = async (req, res, next) => {
  try {
    const { positionId, recruitmentCompensation, content, technologyStackId } =
      req.body;

    if ((!positionId, !recruitmentCompensation, !content, !technologyStackId)) {
      throw new CreateError(400, "Key Error");
    }

    await jobPostingService.posting(req.body, req.user);

    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { positionId, recruitmentCompensation, content, technologyStackId } =
      req.body;

    if ((!positionId, !recruitmentCompensation, !content, !technologyStackId)) {
      throw new CreateError(400, "Key Error");
    }

    const jobPostingId = req.params.jobPostingId;

    await jobPostingService.update(jobPostingId, req.body, req.user);

    res.status(200).json({ message: "Success" });
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    let jobPostingIds = req.query["job-posting-ids"];
    const companyId = req.user.Company.dataValues.id;

    if (!jobPostingIds) {
      return res.status(204).end();
    }

    await jobPostingService.remove(jobPostingIds, companyId);

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { posting, update, remove };
