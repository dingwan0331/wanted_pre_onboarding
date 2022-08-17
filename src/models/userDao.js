const { User, UserRole } = require("../database/models");

const getUser = async (userId) => {
  const user = await User.findOne({
    where: { id: userId, deletedAt: null },
    include: [{ model: UserRole, attributes: ["name"] }],
  });
  return user;
};

module.exports = { getUser };
