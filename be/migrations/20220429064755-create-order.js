"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      status: {
        type: Sequelize.ENUM("paid", "unpaid"),
        default: "unpaid",
      },
      buktiBayar: {
        type: Sequelize.STRING,
        default: "",
      },
      note: {
        type: Sequelize.STRING,
        default: "",
      },
      userId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      addressId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "addresses",
          },
          key: "id",
        },
      },
      paymentId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "payments",
          },
          key: "id",
        },
      },
      shipmentId: {
        type: Sequelize.UUID,
        reference: {
          model: {
            tableName: "shipments",
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
    await queryInterface.dropTable("Orders");
  },
};
