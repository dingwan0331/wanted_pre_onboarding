const { JobPosting } = require("../database/models");
const { CreateError } = require("../utils/exceptions");
const { Op } = require("sequelize");

const getJobPostingByCompanyAndPosition = async (companyId, positionId) => {
  const JobPostingRow = JobPosting.findOne({
    where: { companyId: companyId, positionId: positionId },
  });
  return JobPostingRow;
};

const createJobPosting = async (
  companyId,
  positionId,
  recruitmentCompensation,
  content,
  technologyStackId
) => {
  try {
    const createJobPosting = await JobPosting.create({
      companyId: companyId,
      positionId: positionId,
      recruitmentCompensation: recruitmentCompensation,
      content: content,
      technologyStackId: technologyStackId,
    });

    return createJobPosting;
  } catch (err) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      err = new CreateError(400, `Invalid ${err.fields}`);
    }
    throw err;
  }
};

const getJobPosting = async (JobPostingId) => {
  const JobPostingData = await JobPosting.findByPk(JobPostingId);

  return JobPostingData;
};

const updateJobPosting = async (jobPostingId, updateData) => {
  try {
    const updateJobPosting = await JobPosting.update(updateData, {
      where: { id: jobPostingId },
    });

    return;
  } catch (err) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      err = new CreateError(400, `Invalid ${err.fields}`);
    }
    throw err;
  }
};

const getJobPostings = async (jobPostingIds) => {
  const jobPostings = await JobPosting.findAll({
    where: { id: { [Op.in]: jobPostingIds } },
  });

  return jobPostings;
};

const deleteJobPostings = async (jobPostingIds) => {
  await JobPosting.destroy({ where: { id: jobPostingIds } });
};

module.exports = {
  createJobPosting,
  getJobPostingByCompanyAndPosition,
  getJobPosting,
  updateJobPosting,
  deleteJobPostings,
  getJobPostings,
};
