'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      await queryInterface.addColumn('khoahoc_thisinh', 'payment', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      });

    } catch (error) {
      console.error("Lỗi khi thêm cột 'loaibangthi':", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('khoahoc_thisinh', 'payment');

    } catch (error) {
      console.error("Lỗi khi xóa cột 'loaibangthi':", error);
      throw error;
    }
  }
};
