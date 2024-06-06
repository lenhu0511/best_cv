'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Education extends Model {
    static associate(models) {
      Education.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  Education.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    gpa: DataTypes.FLOAT,
    description: DataTypes.STRING,
    education_level: DataTypes.STRING,
    end_date: DataTypes.DATE,
    from_date: DataTypes.DATE,
    is_graduate: DataTypes.BOOLEAN,
    major: DataTypes.STRING,
    school_name: DataTypes.STRING,
    status: DataTypes.STRING,
    candidate_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Candidate', // Name of the model being referenced
        key: 'id'
      },
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Education',
    tableName: 'education',
    timestamps: false
  });
  return Education;
};
