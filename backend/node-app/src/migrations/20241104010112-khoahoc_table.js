'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('khoahoc', {
      IDKhoaHoc: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      TenKhoaHoc: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      IDDonVi: {
        type: Sequelize.STRING(20),
        allowNull: true, // Nếu có liên kết với bảng khác, thêm tham chiếu khóa ngoại
      },
      NgayThi: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      NamHoc: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      Thi: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      HoiDong: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      TrungTam: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      TrangThai: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('khoahoc');
  }
};
