const { CreateError } = require("../utils/exceptions");
const jobPostingDao = require("../models/jobPostingDao");
const { validateInt } = require("../utils/validators");

const posting = async (bodyData, userData) => {
  const { positionId, recruitmentCompensation, content, technologyStackId } =
    bodyData;
  const company = userData.Company;

  if (!company) {
    throw new CreateError(401, "Company must be registered");
  }

  const companyId = company.dataValues.id;

  const recruitmentCompensationInt = parseInt(+recruitmentCompensation);

  const intData = {
    technologyStackId: technologyStackId,
    positionId: positionId,
    recruitmentCompensation: recruitmentCompensationInt,
  };

  validateInt(intData);

  if (content.length <= 200) {
    throw new CreateError(400, "Content's length must be more than 200");
  }

  const checkJobPosting = await jobPostingDao.getJobPostingByCompanyAndPosition(
    companyId,
    positionId
  );

  if (checkJobPosting) {
    throw new CreateError(400, "Duplicated JobPosting");
  }

  await jobPostingDao.createJobPosting(
    companyId,
    positionId,
    recruitmentCompensation,
    content,
    technologyStackId
  );
  return;
};

const update = async (jobPostingId, bodyData, userData) => {
  const jobPostingData = await jobPostingDao.getJobPosting(jobPostingId);

  if (!jobPostingData) {
    throw new CreateError(400, "Invalid jobPosting");
  }

  const userCompanyId = userData.Company.dataValues.id;
  const jobPostingCompanyId = jobPostingData.dataValues.companyId;

  if (userCompanyId !== jobPostingCompanyId) {
    throw new CreateError(403, "Don't have permission to update");
  }

  const { positionId, recruitmentCompensation, content, technologyStackId } =
    bodyData;

  if (jobPostingData.positionId === positionId) {
    throw new CreateError(400, "Duplicated JobPosting");
  }

  if (isNaN(+recruitmentCompensation)) {
    throw new CreateError(400, "Invalid recruitmentCompensation");
  }

  const recruitmentCompensationInt = parseInt(+recruitmentCompensation);

  const intData = {
    positionId: positionId,
    technologyStackId: technologyStackId,
    recruitmentCompensation: recruitmentCompensationInt,
  };

  validateInt(intData);

  if (content.length <= 200) {
    throw new CreateError(400, "Content's length must be more than 200");
  }

  await jobPostingDao.updateJobPosting(jobPostingId, bodyData);

  return;
};

module.exports = { posting, update };
