const Sequelize = require("sequelize");

module.exports = class Region extends Sequelize.Model {
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
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "Region",
        tableName: "regions",
        paranoid: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Region.hasMany(db.Company, {
      foreignKey: "regionId",
      sourceKey: "id",
    });
    db.Region.belongsTo(db.Country);
  }
};
