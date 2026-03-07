'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('thisinh', {
      IDThiSinh: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      IDKhoaHoc: {
        type: Sequelize.STRING(20),
        references: {
          model: 'khoahoc',
          key: 'IDKhoaHoc'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      Ma_Dang_Ky: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      Ma_Ky_SH: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      HoTen: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      GioiTinh: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
      SoCMT: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      NgaySinh: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      QuocTich: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      DiaChi: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      SucKhoe: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      VanHoa: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      GplxDaCo: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ThamNien: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      SoKm: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      GhiChu: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Anh: {
        type: Sequelize.BLOB,
        allowNull: true,
      },
      DuongDanAnh: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      noidungSH: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('thisinh');
  }
};
