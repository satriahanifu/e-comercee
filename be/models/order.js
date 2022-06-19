"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Order.hasMany(models.DetailOrder, {
        as: "detailorders",
        foreignKey: "orderId",
      });
      models.Order.belongsTo(models.User, {
        as: "customer",
        foreignKey: "userId",
      });
      models.Order.belongsTo(models.Address, {
        as: "order_address",
        foreignKey: "addressId",
      });
      models.Order.belongsTo(models.Payment, {
        as: "payment_method",
        foreignKey: "paymentId",
      });
      models.Order.belongsTo(models.Shipment, {
        as: "shipment_method",
        foreignKey: "shipmentId",
      });
    }
  }
  Order.init(
    {
      status: DataTypes.ENUM("paid", "unpaid"),
      buktiBayar: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
