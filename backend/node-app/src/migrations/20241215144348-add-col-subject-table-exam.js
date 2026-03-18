'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('exam');
      if (!t1.IDSubject) {
        await queryInterface.addColumn('exam', 'IDSubject', {
          type: Sequelize.INTEGER,
        });
      }

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
