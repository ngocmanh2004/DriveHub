'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('subject', 'nameEx', {
        type: Sequelize.STRING,
        allowNull: true,
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('subject', 'nameEx');
    } catch (error) {
      throw error;
    }
  }
};
