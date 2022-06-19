'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.Address,{
        as:"addresses",
        foreignKey:"userId",
      })
      models.User.hasMany(models.Order,{
        as:"orders",
        foreignKey:"userId",
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    role: 
    {
      type: DataTypes.ENUM('admin','customer'),
      default: 'customer'
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};