const Sequelize = require("sequelize");

module.exports = class Country extends Sequelize.Model {
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
        modelName: "Country",
        tableName: "countries",
        paranoid: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    {
      db.Country.hasMany(db.Region, {
        foreignKey: "country_id",
        sourceKey: "id",
      });
    }
  }
};
