'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('khoahoc_thisinh', {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      IDKhoaHoc: {
        type: Sequelize.STRING(20),
        allowNull: true,
        references: {
          model: 'khoahoc', // Tên bảng `khoahoc` đã tồn tại
          key: 'IDKhoaHoc', // Khóa tham chiếu từ bảng `khoahoc`
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
      IDThiSinh: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'thisinh', // Tên bảng `thisinh` đã tồn tại
          key: 'IDThiSinh', // Khóa tham chiếu từ bảng `thisinh`
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
      SoBaoDanh: {
        type: Sequelize.STRING(5),
        allowNull: true,
      },
      IDstatus: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'status', // Tên bảng `thisinh` đã tồn tại
          key: 'ID', // Khóa tham chiếu từ bảng `thisinh`
        },
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('khoahoc_thisinh');
  }
};
