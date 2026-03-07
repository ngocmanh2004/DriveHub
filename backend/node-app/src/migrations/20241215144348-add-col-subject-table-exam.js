'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('exam', 'IDSubject', {
        type: Sequelize.INTEGER
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('exam', 'IDSubject');
    } catch (error) {
      throw error;
    }
  }
};
