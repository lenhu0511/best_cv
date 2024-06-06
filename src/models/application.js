'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';  

export default (sequelize, DataTypes) => {
  class Application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Application.belongsTo(models.Job, { foreignKey: 'job_id' });
      Application.belongsTo(models.Account, { foreignKey: 'account_id' });
    }
  };
  Application.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    application_date:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    status: DataTypes.STRING,
    job_id: DataTypes.STRING,
    account_id: {
      type: DataTypes.STRING,
      references: {
        model: 'Account', // Name of the model being referenced
        key: 'id'
      },
      allowNull : false
    }
  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Application',
    tableName: 'application',
    timestamps: false
  });
  return Application;
};