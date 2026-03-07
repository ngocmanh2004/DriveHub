'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('test_question', 'numberquestion', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('test_question', 'numberquestion');
    } catch (error) {
      throw error;
    }
  }
};
