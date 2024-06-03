'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.Account, { foreignKey: 'role_id' });
    }
  }
  Role.init({
    role_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
