'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('subject', 'threshold', {
        type: Sequelize.INTEGER,
      });

      // await queryInterface.addColumn('thisinh', 'IDResult', {
      //   type: Sequelize.INTEGER,
      // });

      // await queryInterface.addColumn('thisinh', 'IDTest', {
      //   type: Sequelize.INTEGER,
      // });

    } catch (error) {
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('subject', 'threshold');
      // await queryInterface.removeColumn('thisinh', 'IDResult');
      // await queryInterface.removeColumn('thisinh', 'IDTest');

    } catch (error) {
      throw error;
    }
  }
};
