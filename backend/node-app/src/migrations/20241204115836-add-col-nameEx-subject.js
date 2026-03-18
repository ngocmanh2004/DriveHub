'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('subject');
      if (!t1.nameEx) {
        await queryInterface.addColumn('subject', 'nameEx', {
          type: Sequelize.STRING,
          allowNull: true,
        });
      }

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
