'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Award.init({
    award_name: DataTypes.STRING,
    date_received: DataTypes.DATE,
    certificate_img_url: DataTypes.STRING,
    description: DataTypes.STRING,
    candidate_id: DataTypes.STRING

  }, {
    freezeTableName: true,
    sequelize,
    modelName: 'Award',
    timestamps: false
  });
  return Award;
};