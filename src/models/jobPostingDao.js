const {
  JobPosting,
  Position,
  TechnologyStack,
  Company,
  Region,
  Country,
} = require("../database/models");
const { sequelize } = require("../database/models");
const { CreateError } = require("../utils/exceptions");
const { Op, fn } = require("sequelize");

const defaultInclude = [
  {
    model: Company,
    attributes: ["id", "name"],
    include: {
      model: Region,
      attributes: ["id", "name"],
      include: { model: Country },
    },
  },
  { model: Position },
  {
    model: TechnologyStack,
  },
];

const defalutAttibutes = [
  "id",
  "content",
  "recruitmentCompensation",
  "createdAt",
  "updatedAt",
];

const getJobPosting = async (
  whereObject,
  include = defaultInclude,
  attributes = defalutAttibutes
) => {
  const JobPostingRow = await JobPosting.findOne({
    where: whereObject,
    include: include,
    attributes: attributes,
  });
  return JobPostingRow;
};

const createJobPosting = async (createdJobPostingData) => {
  try {
    const jobPostingRow = await JobPosting.create(createdJobPostingData);

    return jobPostingRow;
  } catch (err) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      err = new CreateError(400, `Invalid ${err.fields}`);
    }
    throw err;
  }
};

const getJobPostingByPk = async (
  JobPostingId,
  include = defaultInclude,
  attributes = defalutAttibutes
) => {
  const JobPostingRow = await JobPosting.findByPk(JobPostingId, {
    attributes: attributes,
    include: include,
  });

  return JobPostingRow;
};

const updateJobPosting = async (wherObject, updateData) => {
  try {
    const updateJobPosting = await JobPosting.update(updateData, {
      where: wherObject,
    });

    return;
  } catch (err) {
    if (err.name == "SequelizeForeignKeyConstraintError") {
      err = new CreateError(400, `Invalid ${err.fields}`);
    }
    throw err;
  }
};

const getJobPostings = async (
  whereObject,
  include = defaultInclude,
  attributes = defalutAttibutes
) => {
  const jobPostingRows = await JobPosting.findAll({
    where: whereObject,
    include: include,
    attributes: attributes,
  });

  return jobPostingRows;
};

const deleteJobPostings = async (whereObject) => {
  const deletedCount = await JobPosting.destroy({ where: whereObject });
  return deletedCount;
};

const getJobPostingsInclude = async (findOptions) => {
  try {
    const { offset, limit, order, companyName, technologyStackName } =
      findOptions;

    const jobPostingsRows = await JobPosting.findAll({
      raw: true,
      offset: offset,
      limit: limit,
      order: [order],
      include: [
        {
          model: Company,
          attributes: ["id", "name"],
          where: { name: { [Op.like]: `%${companyName}%` } },
          include: {
            model: Region,
            attributes: ["id", "name"],
            include: { model: Country },
          },
        },
        { model: Position },
        {
          model: TechnologyStack,
          where: { name: { [Op.like]: `%${technologyStackName}%` } },
        },
      ],
    });

    return jobPostingsRows;
  } catch (err) {
    err.message = "Database Error";
    throw err;
  }
};

const getJobPostingsByCompanyId = async (companyId) => {
  try {
    const jobPostingsRows = await JobPosting.findAll({
      raw: true,
      attributes: {
        exclude: [
          "PositionId",
          "positionId",
          "CompanyId",
          "companyId",
          "TechnologyStackId",
          "technologyStackId",
        ],
      },
      where: { companyId: companyId },
      limit: 10,
      order: [fn("RAND")],
      include: [
        {
          model: Company,
          attributes: ["id", "name"],
          include: {
            model: Region,
            attributes: ["id", "name"],
            include: { model: Country },
          },
        },
        { model: Position },
        {
          model: TechnologyStack,
        },
      ],
    });

    return jobPostingsRows;
  } catch (err) {
    err.message = "Database Error";
    throw err;
  }
};

module.exports = {
  createJobPosting,
  getJobPosting,
  getJobPostingByPk,
  updateJobPosting,
  deleteJobPostings,
  getJobPostings,
  getJobPostingsInclude,
  getJobPostingsByCompanyId,
};
