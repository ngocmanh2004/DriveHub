'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('khoahoc_thisinh');
      if (!t1.moneypayment) {
        await queryInterface.addColumn('khoahoc_thisinh', 'moneypayment', {
          type: Sequelize.INTEGER,
          allowNull: true,
        });
      }

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('khoahoc_thisinh', 'moneypayment');

    } catch (error) {
      throw error;
    }
  }
};
