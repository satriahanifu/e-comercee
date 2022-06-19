"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Payment.hasMany(models.Order, {
        as: "orders",
        foreignKey: "paymentId",
      });
    }
  }
  Payment.init(
    {
      bankName: DataTypes.STRING,
      accountName: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
