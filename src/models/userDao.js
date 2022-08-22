const { User, UserRole, Company } = require("../database/models");

const getUserByPk = async (userId) => {
  const userRow = await User.findByPk(userId, {
    include: [
      { model: UserRole, attributes: ["id", "name"] },
      { model: Company, attributes: ["id", "name"] },
    ],
  });
  return userRow;
};

module.exports = { getUserByPk };
