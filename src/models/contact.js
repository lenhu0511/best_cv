'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.Recruiter, { foreignKey: 'recruiter_id' });
      Contact.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  Contact.init({
    contact_date: DataTypes.DATE,
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};
