'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class processtest extends Model {
    static associate(models) {
      // Thiết lập quan hệ 1-nhiều với thisinh
      processtest.hasMany(models.thisinh, {
        foreignKey: 'IDprocesstest', // Khóa ngoại trong bảng thisinh tham chiếu đến processtest
        sourceKey: 'id', // Khoá chính trong bảng processtest
      });
    }
  }
  
  processtest.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'processtest',
    tableName: 'processtest',
    timestamps: false,
  });
  
  return processtest;
};
