'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('subject');
      if (!t1.showsubject) {
        await queryInterface.addColumn('subject', 'showsubject', {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        });
      }

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
