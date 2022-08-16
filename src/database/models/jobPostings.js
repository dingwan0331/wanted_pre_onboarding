const Sequelize = require("sequelize");

module.exports = class JobPosting extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.BIGINT.UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        recruitmentCompensation: {
          type: Sequelize.DECIMAL(11, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "JobPosting",
        tableName: "job_postings",
        paranoid: true,
        underscored: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.JobPosting.belongsToMany(db.TechnologyStack, {
      through: "job_posting_and_technology_stack",
    });
    db.JobPosting.hasMany(db.Apply, {
      foreignKey: "jobPostingId",
      sourceKey: "id",
    });
    db.JobPosting.belongsTo(db.Position);
    db.JobPosting.belongsTo(db.Company);
  }
};
