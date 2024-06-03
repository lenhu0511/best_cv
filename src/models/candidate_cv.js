'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class CandidateCV extends Model {
    static associate(models) {
      CandidateCV.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  CandidateCV.init({
    cv_title: DataTypes.STRING,
    cv_content: DataTypes.STRING,
    create_date: DataTypes.DATE,
    last_edit_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'CandidateCV',
  });
  return CandidateCV;
};
