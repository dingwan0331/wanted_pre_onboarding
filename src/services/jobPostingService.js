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

module.exports = { posting };
