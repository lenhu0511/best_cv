'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    device_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    status: DataTypes.STRING,
    create_date: DataTypes.DATE,
    update_date: DataTypes.DATE,
    role_id: DataTypes.STRING

  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Account',
    timestamps: false
  });
  return Account;
};