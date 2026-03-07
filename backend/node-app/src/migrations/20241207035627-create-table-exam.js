'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('exam', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      IDThisinh: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      IDTest: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      answerlist: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      point: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      result: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('exam');
  }
};
