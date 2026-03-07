'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      console.log("Bắt đầu thực hiện thay đổi cột 'Anh' thành MEDIUMBLOB");
      // Thay đổi kiểu dữ liệu của cột 'Anh' trong bảng 'thisinh' thành MEDIUMBLOB
      await queryInterface.changeColumn('thisinh', 'Anh', {
        type: Sequelize.BLOB('long'), // Đảm bảo sử dụng DataTypes
        allowNull: true,
      });
      console.log("Thay đổi cột 'Anh' thành MEDIUMBLOB thành công");
    } catch (error) {
      console.error("Lỗi khi thực hiện migration 'up':", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log("Bắt đầu khôi phục cột 'Anh' về kiểu BLOB");
      // Khôi phục lại kiểu dữ liệu ban đầu của cột 'Anh' nếu cần
      await queryInterface.changeColumn('thisinh', 'Anh', {
        type: Sequelize.BLOB,
        allowNull: true,
      });
      console.log("Khôi phục cột 'Anh' về kiểu BLOB thành công");
    } catch (error) {
      console.error("Lỗi khi thực hiện migration 'down':", error);
      throw error;
    }
  }
};
