const applyDao = require("../models/applyDao");
const { CreateError } = require("../utils/exceptions");

const postApply = async (bodyData, userData) => {
  const { jobPostingId } = bodyData;
  const userId = userData.id;

  const applyRows = await applyDao.getApplies(jobPostingId, userId);

  if (applyRows.length >= 1) {
    throw new CreateError(400, "Duplicated apply");
  }

  const createApply = await applyDao.createApply(jobPostingId, userId);

  return;
};

module.exports = { postApply };
