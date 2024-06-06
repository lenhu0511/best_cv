'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Contact extends Model {
    static associate(models) {
      Contact.belongsTo(models.Recruiter, { foreignKey: 'recruiter_id' });
      Contact.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  }
  Contact.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    contact_date: DataTypes.DATE,
    message: DataTypes.STRING,
    recruiter_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Recruiter', // Name of the model being referenced
        key: 'id'
      },
      allowNull : false
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
    modelName: 'Contact',
    tableName: 'contact',
    timestamps: false
  });
  return Contact;
};
