"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DetailOrders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      price: {
        type: Sequelize.DOUBLE,
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
      orderId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "orders",
          },
          key: "id",
        },
      },
      productId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "products",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DetailOrders");
  },
};
