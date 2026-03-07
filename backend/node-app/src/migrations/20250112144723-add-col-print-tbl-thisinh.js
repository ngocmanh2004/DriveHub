'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('thisinh', 'print', {
        type: Sequelize.BOOLEAN,
        defaultValue : false
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('thisinh', 'print');
    } catch (error) {
      throw error;
    }
  }
};
