const Sequelize = require("sequelize");
const User = require("./users");
const Country = require("./countries");
const Region = require("./regions");
const Company = require("./companies");
const TechnologyStack = require("./technologyStacks");
const Position = require("./positions");
const JobPosting = require("./jobPostings");
const Apply = require("./applies");
const UserRole = require("./userRoles");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Country = Country;
db.Region = Region;
db.JobPosting = JobPosting;
db.Company = Company;
db.TechnologyStack = TechnologyStack;
db.Position = Position;
db.Apply = Apply;
db.UserRole = UserRole;

User.init(sequelize);
Country.init(sequelize);
Region.init(sequelize);
JobPosting.init(sequelize);
Company.init(sequelize);
TechnologyStack.init(sequelize);
Position.init(sequelize);
Apply.init(sequelize);
UserRole.init(sequelize);

User.associate(db);
Country.associate(db);
Region.associate(db);
JobPosting.associate(db);
Company.associate(db);
TechnologyStack.associate(db);
Position.associate(db);
Apply.associate(db);
UserRole.associate;

module.exports = db;
