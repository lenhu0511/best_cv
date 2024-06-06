'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class CandidateCV extends Model {
    static associate(models) {
      CandidateCV.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  CandidateCV.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
    },
    cv_title: DataTypes.STRING,
    cv_content: DataTypes.STRING,
    create_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    last_edit_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
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
    modelName: 'CandidateCV',
    tableName: 'candidate_cv',
    hooks: {
      beforeCreate: (candidateCV, options) => {
        candidateCV.create_date = new Date();
        candidateCV.last_edit_date = new Date();
      },
      beforeUpdate: (candidateCV, options) => {
        candidateCV.last_edit_date = new Date();
      },
    }
  });
  return CandidateCV;
};
