const { CreateError } = require("../utils/exceptions");
const jobPostingDao = require("../models/jobPostingDao");
const { isPositiveInt } = require("../utils/validators");

const posting = async (bodyData, userData) => {
  const { positionId, recruitmentCompensation, content, technologyStackId } =
    bodyData;
  const company = userData.Company;

  if (!company) {
    throw new CreateError(401, "Company must be registered");
  }

  const companyId = company.dataValues.id;

  if (!isPositiveInt(technologyStackId)) {
    throw new CreateError(400, "Invalid technologyStackId");
  }

  if (!isPositiveInt(positionId)) {
    throw new CreateError(400, "Invalid positionId");
  }

  if (content.length <= 200) {
    throw new CreateError(400, "Content's length must be more than 300");
  }

  if (isNaN(+recruitmentCompensation)) {
    throw new CreateError(400, "Invalid recruitmentCompensation");
  }

  const recruitmentCompensationInt = parseInt(+recruitmentCompensation);
  if (!isPositiveInt(recruitmentCompensationInt)) {
    throw new CreateError(400, "recruitmentCompensation must be more than 0");
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

module.exports = { posting };
