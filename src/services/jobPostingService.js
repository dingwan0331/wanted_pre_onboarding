const { CreateError } = require("../utils/exceptions");
const jobPostingDao = require("../models/jobPostingDao");
const { isPositiveInt } = require("../utils/validators");

const posting = async (data) => {
  const {
    companyId,
    positionId,
    recruitmentCompensation,
    content,
    technologyStackId,
  } = data;

  if (!isPositiveInt(companyId)) {
    throw new CreateError(400, "Invalid companyId");
  }

  if (!isPositiveInt(technologyStackId)) {
    throw new CreateError(400, "Invalid technologyStackId");
  }

  if (!isPositiveInt(positionId)) {
    throw new CreateError(400, "Invalid positionId");
  }

  if (content.length <= 300) {
    throw new CreateError(400, "Content's length must be more than 300");
  }

  if (isNaN(+recruitmentCompensation)) {
    throw new CreateError(400, "Invalid recruitmentCompensation");
  }

  const recruitmentCompensationInt = parseInt(+recruitmentCompensation);
  if (!isPositiveInt(recruitmentCompensationInt)) {
    throw new CreateError(400, "recruitmentCompensation must be more than 0");
  }

  const checkJobPosting = await jobPostingDao.getJobPosting(
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
