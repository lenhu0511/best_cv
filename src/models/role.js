'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Account, { foreignKey: 'role_id' });
    }
  }
  Role.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
    role_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
