const { User, UserRole, Company } = require("../database/models");

const getTokenUser = async (userId) => {
  const user = await User.findOne({
    where: { id: userId, deletedAt: null },
    include: [
      { model: UserRole, attributes: ["name"] },
      { model: Company, attributes: ["id"] },
    ],
  });
  return user;
};

module.exports = { getTokenUser };
