'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      const t1 = await queryInterface.describeTable('thisinh');
      if (!t1.IDprocesstest) {
        await queryInterface.addColumn('thisinh', 'IDprocesstest', {
          type: Sequelize.INTEGER,
          allowNull: true,
          defaultValue: 1,
        });
      }
    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('thisinh', 'IDprocesstest');

    } catch (error) {
      throw error;
    }
  }
};
