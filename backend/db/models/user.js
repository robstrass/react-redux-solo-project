'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      },
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });

  // returns User instance with only User instance info that is safe to save to a JWT
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };

  // checks if the password passed in matches password stored to User instance
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString())
  };

  // uses currentUser scope to return the user with that id
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  }

  // accepts object and checks credentials for username OR email
  // if user exists and PW matches, login
  User.login = async function ({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };

  // hashes password and logs in user after signup
  User.signup = async function ({ username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword
    });
    return await User.scope('currentUser').findByPk(user.id);
  }

  User.associate = function(models) {
    User.hasMany(models.Album, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    });
    User.hasMany(models.Image, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      onDelete: 'cascade',
      hooks: true
    });
  };
  return User;
};
