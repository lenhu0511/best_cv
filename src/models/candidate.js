'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
export default (sequelize, DataTypes) => {
  class Candidate extends Model {
    static associate(models) {
      Candidate.belongsTo(models.Account, { foreignKey: 'account_id' });
      Candidate.hasMany(models.Award, { foreignKey: 'candidate_id' });
      Candidate.hasMany(models.CandidateCV, { foreignKey: 'candidate_id' });
      Candidate.hasMany(models.Contact, { foreignKey: 'candidate_id' });
      Candidate.hasMany(models.Education, { foreignKey: 'candidate_id' });
      Candidate.hasMany(models.WorkExperience, { foreignKey: 'candidate_id' });
    }
  }
  Candidate.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    full_name: DataTypes.STRING,
    dob: DataTypes.DATE,
    gender: DataTypes.STRING,
    job_position: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    work_status: DataTypes.STRING,
    description: DataTypes.STRING,
    interests: DataTypes.STRING,
    avatar_img_url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Candidate',
  });
  return Candidate;
};
