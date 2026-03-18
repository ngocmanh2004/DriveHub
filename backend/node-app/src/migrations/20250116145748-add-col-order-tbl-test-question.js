'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('test_question');
      if (!t1.order) {
        await queryInterface.addColumn('test_question', 'order', {
          type: Sequelize.INTEGER,
        });
      }

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
