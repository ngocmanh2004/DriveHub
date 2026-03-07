'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class status extends Model {
    static associate(models) {
      // Thiết lập quan hệ 1-nhiều với khoahoc_thisinh
      status.hasMany(models.khoahoc_thisinh, {
        foreignKey: 'IDstatus', // Khóa ngoại trong bảng khoahoc_thisinh tham chiếu đến status
        sourceKey: 'id', // Khoá chính trong bảng status
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    }
  }
  
  status.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    namestatus: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'status',
    tableName: 'status',
    timestamps: false,
  });
  
  return status;
};
