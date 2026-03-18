'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('exam');
      if (!t1.note) {
        await queryInterface.addColumn('exam', 'note', {
          type: Sequelize.STRING,
          defaultValue: "",
        });
      }

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
