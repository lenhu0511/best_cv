'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Application.init({
    application_date: DataTypes.DATE,
    status: DataTypes.STRING,
    job_id: DataTypes.STRING,
    account_id: DataTypes.STRING

  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Application',
    timestamps: false
  });
  return Application;
};