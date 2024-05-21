'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TokenData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      token: {
        allowNull: false,
        type: Sequelize.STRING
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notNull: { msg: "Please enter your userId" },
        },
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM("ACCESS", "RESET_PASSWORD", "VERIFY_EMAIL"),
        defaultValue: "ACCESS",
        validate: {
          notNull: { msg: "Please specify the token type" },
          isIn: {
            args: [["ACCESS", "RESET_PASSWORD", "VERIFY_EMAIL"]],
            msg: "Invalid token type",
          },
        },
      },
      expiration: {
        allowNull: false,
        type: Sequelize.DATE,
        validate: {
          notNull: { msg: "Expiration date is required" },
          isDate: { msg: "Must be a valid date" },
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TokenData');
  }
};