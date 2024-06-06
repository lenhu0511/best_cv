'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.hasMany(models.Application, { foreignKey: 'account_id' });
      Account.hasOne(models.Candidate, { foreignKey: 'account_id' });
      Account.hasOne(models.Recruiter, { foreignKey: 'account_id' });
      Account.belongsTo(models.Role, { foreignKey: 'role_id' });
      Account.hasMany(models.Job, { foreignKey: 'account_id' });
    }
  };
  Account.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    device_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    status: DataTypes.STRING,
    create_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    update_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    role_id: {
        type: DataTypes.STRING,
        references: {
            model: 'Role',
            key: 'id'
        },
        validate: {
            notEmpty: true,
            // Optionally, if you have specific roles:
            isIn: [['1', '2']]  // Adjust the role IDs as necessary.
        }
    }

  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Account',
    timestamps: false
  });
  return Account;
};