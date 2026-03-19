'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('khoahoc_thisinh', 'SoBaoDanh', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('khoahoc_thisinh', 'SoBaoDanh', {
      type: Sequelize.STRING(5),
      allowNull: true,
    });
  },
};
