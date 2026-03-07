'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('test', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      IDSubject: {
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('test');
  }
};