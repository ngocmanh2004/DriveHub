'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class khoahoc_thisinh extends Model {
    static associate(models) {
      // Quan hệ 1-1 với bảng thisinh
      khoahoc_thisinh.belongsTo(models.thisinh, {
        foreignKey: 'IDThiSinh',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // Quan hệ với bảng khoahoc
      khoahoc_thisinh.belongsTo(models.khoahoc, {
        foreignKey: 'IDKhoaHoc',
        targetKey: 'IDKhoaHoc',
        onUpdate: 'NO ACTION',
        onDelete: 'SET NULL',
      });

      // Quan hệ với bảng status
      khoahoc_thisinh.belongsTo(models.status, {
        foreignKey: 'IDstatus',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  }

  khoahoc_thisinh.init({
    // ID - Khóa chính tự động tăng
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Mã khóa học
    IDKhoaHoc: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // ID của thí sinh
    IDThiSinh: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Số báo danh của thí sinh
    SoBaoDanh: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Trạng thái
    IDstatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Số thứ tự
    stt: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Trạng thái thanh toán (True: đã thanh toán, False: chưa thanh toán)
    payment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // Số tiền đã thanh toán
    moneypayment: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Thời gian tạo bản ghi
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Thời gian cập nhật bản ghi
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    modelName: 'khoahoc_thisinh',
    tableName: 'khoahoc_thisinh',
    timestamps: true, // Sequelize sẽ tự động tạo các trường createdAt, updatedAt
  });

  return khoahoc_thisinh;
};
