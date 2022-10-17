'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/brcypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Photo);
      this.hasMany(models.SocialMedia);
      this.hasMany(models.Comment);
    }
  }
  User.init({
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: 'full_name only accept letters.'
        },
        notEmpty: {
          msg: 'full_name cannot be empty.',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: {
          msg: 'email cannot be empty.'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'username cannot be empty.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'password cannot be empty.'
        }
      }
    },
    profile_image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'profile image url cannot be empty.'
        },
        isUrl: {
          msg: 'profile_image_url valid url.'
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'age cannot be empty.'
        },
        isInt: {
          msg: 'age must be a number.'
        }
      }
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'phone number must be number.'
        },
        notEmpty: {
          msg: 'phone number cannot be empty.'
        },

      }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, opt) => {
        const hashedPassword = hashPassword(user.password)
        user.password = hashedPassword;
      }
    }
  });
  return User;
};