const Sequelize = require("sequelize");

module.exports = class UserRole extends Sequelize.Model {
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
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: "UserRole",
        tableName: "user_roles",
        paranoid: false,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.UserRole.hasMany(db.User, {
      foreignKey: "userRoleId",
      sourceKey: "id",
    });
  }
};
