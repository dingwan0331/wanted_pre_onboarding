const Sequelize = require("sequelize");

module.exports = class Position extends Sequelize.Model {
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
        modelName: "Position",
        tableName: "positions",
        paranoid: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Position.hasMany(db.JobPosting, {
      foreignKey: "positionId",
      sourceKey: "id",
    });
  }
};
