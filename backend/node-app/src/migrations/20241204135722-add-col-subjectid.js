'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('test_question');
      if (!t1.IDsubject) {
        await queryInterface.addColumn('test_question', 'IDsubject', {
          type: Sequelize.INTEGER,
        });
      }

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('test_question', 'IDsubject');
    } catch (error) {
      throw error;
    }
  }
};
