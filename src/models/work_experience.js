'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class WorkExperience extends Model {
    static associate(models) {
      WorkExperience.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  WorkExperience.init({
    idid: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    job_name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'WorkExperience',
  });
  return WorkExperience;
};
