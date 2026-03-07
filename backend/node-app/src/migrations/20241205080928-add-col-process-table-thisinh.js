'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      await queryInterface.addColumn('thisinh', 'IDprocesstest', {
        type: Sequelize.INTEGER,
        allowNull: true,  // Nếu bạn muốn trường này có thể null
        defaultValue: 1,
      });
    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('thisinh', 'IDprocesstest');

    } catch (error) {
      throw error;
    }
  }
};
