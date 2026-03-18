'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log("Thêm cột 'loaibangthi' vào bảng 'thisinh'");
      
      // Thêm cột 'loaibangthi' kiểu STRING vào bảng 'thisinh'
      const t1 = await queryInterface.describeTable('khoahoc_thisinh');
      if (!t1.stt) {
        await queryInterface.addColumn('khoahoc_thisinh', 'stt', {
          type: Sequelize.INTEGER,
          allowNull: true,
        });
      }

      console.log("Thêm cột 'loaibangthi' thành công");
    } catch (error) {
      console.error("Lỗi khi thêm cột 'loaibangthi':", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Xóa cột 'loaibangthi' khỏi bảng 'thisinh'
      await queryInterface.removeColumn('khoahoc_thisinh', 'stt');

      console.log("Xóa cột 'loaibangthi' thành công");
    } catch (error) {
      console.error("Lỗi khi xóa cột 'loaibangthi':", error);
      throw error;
    }
  }
};
