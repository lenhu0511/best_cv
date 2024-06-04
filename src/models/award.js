'use strict';
import { Model } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export default (sequelize, DataTypes) => {
  class Award extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Award.belongsTo(models.Candidate, { foreignKey: 'candidate_id' });
    }
  };
  Award.init({
    id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4()  // Use uuidv4 to generate a unique ID
  },
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