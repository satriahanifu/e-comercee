"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Shipment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Shipment.hasMany(models.Order, {
        as: "orders",
        foreignKey: "shipmentId",
      });
    }
  }
  Shipment.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Shipment",
    }
  );
  return Shipment;
};
