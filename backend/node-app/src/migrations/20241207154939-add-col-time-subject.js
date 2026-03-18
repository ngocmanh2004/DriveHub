'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('subject');
      if (!t1.timeFinish) {
        await queryInterface.addColumn('subject', 'timeFinish', {
          type: Sequelize.INTEGER,
          defaultValue: 6,
        });
      }

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('subject', 'timeFinish');
    } catch (error) {
      throw error;
    }
  }
};
