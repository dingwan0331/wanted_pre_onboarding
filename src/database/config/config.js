const dotenv = require("dotenv");
dotenv.config();

const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;
const database = process.env.MYSQL_DATABASE;
const dialect = process.env.MYSQL_DIALECT;

const development = {
  username: username,
  password: password,
  database: database,
  host: host,
  dialect: dialect,
};

const test = {
  username: username,
  password: password,
  database: database,
  host: host,
  dialect: dialect,
};

const production = {
  username: username,
  password: password,
  database: database,
  host: host,
  dialect: dialect,
};

module.exports = { development, test, production };
