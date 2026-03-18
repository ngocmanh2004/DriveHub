'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      
      const t1 = await queryInterface.describeTable('khoahoc_thisinh');
      if (!t1.payment) {
        await queryInterface.addColumn('khoahoc_thisinh', 'payment', {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        });
      }

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
