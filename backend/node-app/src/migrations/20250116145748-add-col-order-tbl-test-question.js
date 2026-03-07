'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('test_question', 'order', {
        type: Sequelize.INTEGER
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('test_question', 'order');
    } catch (error) {
      throw error;
    }
  }
};
