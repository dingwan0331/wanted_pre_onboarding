const Sequelize = require("sequelize");

module.exports = class TechnologyStack extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: Sequelize.STRING(30),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "TechnologyStack",
        tableName: "technology_stacks",
        paranoid: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.TechnologyStack.hasMany(db.JobPosting, {
      foreignKey: "technologyStackId",
      sourceKey: "id",
    });
  }
};
