'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('exam', 'note', {
        type: Sequelize.STRING,
        defaultValue : ""
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('exam', 'note');
    } catch (error) {
      throw error;
    }
  }
};
