'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  Education.init({
    gpa: DataTypes.FLOAT,
    description: DataTypes.STRING,
    education_level: DataTypes.STRING,
    end_date: DataTypes.DATE,
    from_date: DataTypes.DATE,
    is_graduate: DataTypes.BOOLEAN,
    major: DataTypes.STRING,
    school_name: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Education',
  });
  return Education;
};
