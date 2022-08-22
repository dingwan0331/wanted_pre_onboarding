const { CreateError } = require("../utils/exceptions");
const jobPostingDao = require("../models/jobPostingDao");
const { validateInt } = require("../utils/validators");

const postJobPostings = async (bodyData, userData) => {
  const { positionId, recruitmentCompensation, content, technologyStackId } =
    bodyData;

  const company = userData.Company;

  if (!company) {
    throw new CreateError(401, "Company must be registered");
  }

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

  const companyId = company.id;

  const whereObject = { companyId: companyId, positionId: positionId };

  const checkJobPostingRows = await jobPostingDao.getJobPosting(whereObject);

  if (checkJobPostingRows) {
    throw new CreateError(400, "Duplicated JobPosting");
  }

  const createdJobPostingData = bodyData;
  createdJobPostingData.companyId = companyId;

  const jobPostingRow = await jobPostingDao.createJobPosting(
    createdJobPostingData
  );

  return jobPostingRow;
};

const updateJobPosting = async (jobPostingId, bodyData, userData) => {
  const checkJobPostingRow = await jobPostingDao.getJobPostingByPk(
    jobPostingId
  );

  if (!checkJobPostingRow) {
    throw new CreateError(400, "Invalid jobPosting");
  }

  const userCompanyId = userData.Company.id;

  const jobPostingCompanyId = checkJobPostingRow.Company.id;

  if (userCompanyId !== jobPostingCompanyId) {
    throw new CreateError(403, "Don't have permission to update");
  }

  const { positionId, recruitmentCompensation, content, technologyStackId } =
    bodyData;

  if (checkJobPostingRow.positionId === positionId) {
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

  const whereObject = { id: jobPostingId };
  const jobPostingRow = await jobPostingDao.updateJobPosting(
    whereObject,
    bodyData
  );

  return jobPostingRow;
};

const remove = async (jobPostingIds, companyId) => {
  try {
    jobPostingIds = JSON.parse(jobPostingIds);

    validateInt(jobPostingIds);

    if (!jobPostingIds.length) {
      return;
    }

    const jobPostings = await jobPostingDao.getJobPostings(jobPostingIds);

    jobPostings.forEach((element) => {
      if (element.dataValues.companyId !== companyId) {
        throw new CreateError(403, "Don't have permission to delete");
      }
    });

    if (!(jobPostings.length === jobPostingIds.length)) {
      throw new CreateError(400, "Already been deleted");
    }

    await jobPostingDao.deleteJobPostings(jobPostingIds);

    return;
  } catch (err) {
    if ((err.message = "Unexpected end of JSON input")) {
      throw new CreateError(400, "Invalid query");
    }
  }
};

const getJobPostings = async (
  offset = 0,
  limit = 20,
  companyName = "",
  technologyStackName = "",
  orderKey = "-createdAt"
) => {
  validateInt([offset + 1, limit]);

  offset = Number(offset);
  limit = Number(limit);

  const orderSet = {
    createdAt: ["createdAt", "ASC"],
    "-createdAt": ["createdAt", "DESC"],
    recruitmentCompensation: ["recruitmentCompensation", "ASC"],
    "-recruitmentCompensation": ["recruitmentCompensation", "DESC"],
  };

  if (!orderSet[orderKey]) {
    throw new CreateError(400, "Invalid orderKey");
  }

  const order = orderSet[orderKey];

  const jobPostingsRows = await jobPostingDao.getJobPostingsInclude({
    offset: offset,
    limit: limit,
    companyName: companyName,
    technologyStackName: technologyStackName,
    order: order,
  });

  const result = [];

  jobPostingsRows.forEach((row) =>
    result.push({
      id: row.id,
      position: row["Position.name"],
      recruitmentCompensation: parseInt(row.recruitmentCompensation),
      createdAt: row.createdAt,
      company: {
        name: row["Company.name"],
        region: row["Company.Region.name"],
        coountry: row["Company.Region.Country.name"],
      },
      technologyStack: row["TechnologyStack.name"],
    })
  );

  return result;
};

const getJobPosting = async (jobPostingId) => {
  const jobPostingsRow = await jobPostingDao.getJobPostingByPk(jobPostingId);

  if (!jobPostingsRow) {
    throw new CreateError(404, "Not Found");
  }

  const companyId = jobPostingsRow["Company.id"];

  const sameCompanyJobPostingsRows =
    await jobPostingDao.getJobPostingsByCompanyId(companyId);

  const sameCompanyJobPostings = [];
  sameCompanyJobPostingsRows.forEach((row) =>
    sameCompanyJobPostings.push({
      id: row.id,
      position: row["Position.name"],
      createdAt: row.createdAt,
    })
  );

  const result = {
    id: jobPostingsRow.id,
    position: jobPostingsRow["Position.name"],
    content: jobPostingsRow.content,
    recruitmentCompensation: parseInt(jobPostingsRow.recruitmentCompensation),
    createdAt: jobPostingsRow.createdAt,
    company: {
      name: jobPostingsRow["Company.name"],
      region: jobPostingsRow["Company.Region.name"],
      coountry: jobPostingsRow["Company.Region.Country.name"],
    },
    technologyStack: jobPostingsRow["TechnologyStack.name"],
    sameCompanyJobPostings: sameCompanyJobPostings,
  };

  return result;
};

module.exports = {
  postJobPostings,
  updateJobPosting,
  remove,
  getJobPostings,
  getJobPosting,
};
