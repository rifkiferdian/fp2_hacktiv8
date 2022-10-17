'use strict';
const {
  Model
} = require('sequelize');
const User = require('User');
module.exports = (sequelize, DataTypes) => {
  class SocialMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  SocialMedia.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Name cannot be empty.'
        }
      }
    },
    social_media_url: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Social media URL cannot be empty.'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SocialMedia',
  });
  // SocialMedia.User = SocialMedia.belongsTo(User);
  return SocialMedia;
};