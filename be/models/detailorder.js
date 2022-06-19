"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.DetailOrder.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
      models.DetailOrder.belongsTo(models.Order, {
        as: "orders",
        foreignKey: "orderId",
      });
    }
  }
  DetailOrder.init(
    {
      price: DataTypes.DOUBLE,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DetailOrder",
    }
  );
  return DetailOrder;
};
