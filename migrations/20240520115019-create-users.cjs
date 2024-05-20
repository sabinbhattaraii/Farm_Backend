'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { genderEnum, roleEnum, statusEnum } = await import('../constant/constant.js');
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM(Object.values(genderEnum)),
        defaultValue: genderEnum.MALE,
      },
      role: {
        type: Sequelize.ENUM(Object.values(roleEnum)),
        defaultValue: roleEnum.CUSTOMER,
      },
      phone: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      profilePicture: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM(Object.values(statusEnum)),
        defaultValue: statusEnum.ACTIVE,
      },
      lastLogin: {
        type: Sequelize.DATE,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Users');
  }
};