const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { getUser } = require("../models/userDao");
const { CreateError } = require("../utils/Exceptions");

dotenv.config();

const tokenError = new CreateError(401, "Invalid Token");

function tokenValidator(checkRole) {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
      const userId = decoded.userId;
      const userData = await getUser(userId);

      if (!userData) {
        throw tokenError;
      }

      const userRole = userData.UserRole.dataValues.name;

      if (checkRole !== userRole) {
        throw tokenError;
      }

      let reqUser = userData.dataValues;
      reqUser.UserRole = userRole;

      req.user = reqUser;

      next();
    } catch (err) {
      if (err.name == "JsonWebTokenError") {
        err = tokenError;
      }
      next(err);
    }
  };
}
module.exports = tokenValidator;
