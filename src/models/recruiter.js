'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Recruiter extends Model {
    static associate(models) {
      Recruiter.belongsTo(models.Account, { foreignKey: 'account_id' });
      Recruiter.hasMany(models.Job, { foreignKey: 'recruiters_id' });
      Recruiter.hasMany(models.Contact, { foreignKey: 'recruiter_id' });
    }
  }
  Recruiter.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    company_name: DataTypes.STRING,
    company_description: DataTypes.STRING,
    contact_person: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    account_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Account', // Name of the model being referenced
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Recruiter',
    tableName: 'recruiter',
    timestamps: false
  });
  return Recruiter;
};
