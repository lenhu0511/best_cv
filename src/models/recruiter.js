'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Recruiter extends Model {
    static associate(models) {
      Recruiter.belongsTo(models.Account, { foreignKey: 'account_id' });
      Recruiter.hasMany(models.Job, { foreignKey: 'recruiters_id' });
      Recruiter.hasMany(models.Contact, { foreignKey: 'recruiter_id' });
    }
  }
  Recruiter.init({
    company_name: DataTypes.STRING,
    company_description: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Recruiter',
  });
  return Recruiter;
};
