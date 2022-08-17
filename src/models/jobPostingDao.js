const { JobPosting, TechnologyStack } = require("../database/models");
const { CreateError } = require("../utils/exceptions");

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
    const TechnologyStackRow = await TechnologyStack.findByPk(
      technologyStackId
    );

    const createJobPosting = await JobPosting.create({
      companyId: companyId,
      positionId: positionId,
      recruitmentCompensation: recruitmentCompensation,
      content: content,
    });

    return createJobPosting.addTechnologyStack(TechnologyStackRow);
  } catch (err) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      err = new CreateError(400, `Invalid ${err.fields}`);
    }
    throw err;
  }
};

module.exports = { createJobPosting, getJobPostingByCompanyAndPosition };
