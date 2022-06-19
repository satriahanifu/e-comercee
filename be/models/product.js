"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.Category, {
        as: "category",
        foreignKey: "categoryId",
      });
      models.Product.hasMany(models.DetailOrder, {
        as: "detailorders",
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
      size: DataTypes.ENUM("small", "medium", "large", "extra large"),
      image: DataTypes.STRING,
      categoryId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
