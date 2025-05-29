"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      price: {
        type: Sequelize.INTEGER,
      },
      area: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
        allowNull: false,
      },
      province: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        allowNull: false,
      },
      priceRangeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "PriceRanges",
          key: "id",
        },
        allowNull: false,
      },
      areaRangeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "AreaRanges",
          key: "id",
        },
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["SHOW", "HIDE"],
        defaultValue: "HIDE",
      },
      target: {
        type: Sequelize.ENUM,
        values: ["ALL", "MALE", "FEMALE"],
        defaultValue: "ALL",
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
    await queryInterface.dropTable("Posts");
  },
};
