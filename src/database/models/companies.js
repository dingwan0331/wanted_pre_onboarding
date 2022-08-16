const Sequelize = require("sequelize");

module.exports = class Company extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Company",
        tableName: "companies",
        paranoid: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Company.hasMany(db.JobPosting, {
      foreignKey: "companyId",
      sourceKey: "id",
      onDelete: "cascade",
    }),
      db.Company.belongsToMany(db.TechnologyStack, {
        through: "company_and_technology_stack",
      });
  }
};
