'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Recruiter, { foreignKey: 'recruiters_id' });
      Job.hasMany(models.Application, { foreignKey: 'job_id' });
    }
  }
  Job.init({
    job_title: DataTypes.STRING,
    job_type: DataTypes.STRING,
    job_description: DataTypes.STRING,
    job_requirements: DataTypes.STRING,
    location: DataTypes.STRING,
    salary: DataTypes.DECIMAL,
    post_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};
