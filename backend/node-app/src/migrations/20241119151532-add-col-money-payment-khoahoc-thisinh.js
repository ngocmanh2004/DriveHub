'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('khoahoc_thisinh', 'moneypayment', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('khoahoc_thisinh', 'moneypayment');

    } catch (error) {
      throw error;
    }
  }
};
