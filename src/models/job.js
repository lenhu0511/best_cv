'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
export default (sequelize, DataTypes) => {
  class Job extends Model {
    static associate(models) {
      Job.belongsTo(models.Account, { foreignKey: 'account_id' });
      Job.hasMany(models.Application, { foreignKey: 'job_id' });
    }
  }
  Job.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    job_title: DataTypes.STRING,
    job_type: DataTypes.STRING,
    job_description: DataTypes.STRING,
    job_requirements: DataTypes.STRING,
    location: DataTypes.STRING,
    salary: DataTypes.DECIMAL,
    post_date: DataTypes.DATE,
    status: DataTypes.STRING,
    account_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Account', // Name of the model being referenced
        key: 'id'
      },
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Job',
    tableName: 'job',
    timestamps: false
  });
  return Job;
};
