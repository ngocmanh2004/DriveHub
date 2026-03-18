'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      const t1 = await queryInterface.describeTable('subject');
      if (!t1.IDrank) {
        await queryInterface.addColumn('subject', 'IDrank', {
          type: Sequelize.INTEGER,
          defaultValue: 1,
        });
      }
    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('subject', 'IDrank');
    } catch (error) {
      throw error;
    }
  }
};
