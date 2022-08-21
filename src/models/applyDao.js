const { sequelize, JobPosting } = require("../database/models");
const { Apply } = require("../database/models");

const createApply = async (jobPostingId, userId) => {
  try {
    await Apply.create({ jobPostingId: jobPostingId, userId: userId });
  } catch (err) {
    err.message = "Database Error";
    throw err;
  }
};

const getApplies = async (jobPostingId, userId) => {
  try {
    const applyRow = await Apply.findAll({
      raw: true,
      where: { jobPostingId: jobPostingId, userId, userId },
    });

    return applyRow;
  } catch (err) {
    err.message = "Database Error";
    throw err;
  }
};

module.exports = { createApply, getApplies };
