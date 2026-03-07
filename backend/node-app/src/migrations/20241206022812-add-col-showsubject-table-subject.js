'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('subject', 'showsubject', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('subject', 'showsubject');
    } catch (error) {
      throw error;
    }
  }
};
