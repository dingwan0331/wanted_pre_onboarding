const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const userDao = require("../models/userDao");
const { CreateError } = require("../utils/Exceptions");

dotenv.config();

const tokenError = new CreateError(401, "Invalid Token");

function tokenValidator(checkRole) {
  return async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const decoded = jwt.verify(authorization, process.env.SECRET_KEY);
      const userId = decoded.userId;
      const userRow = await userDao.getUserByPk(userId);

      if (!userRow) {
        throw tokenError;
      }

      const userRole = userRow["UserRole.name"];

      if (checkRole !== userRole) {
        throw tokenError;
      }

      req.user = userRow;

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
