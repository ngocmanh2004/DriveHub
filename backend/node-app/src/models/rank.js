'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rank extends Model {
    static associate(models) {
      // Thiết lập quan hệ 1-nhiều với thisinh
      rank.hasMany(models.subject, {
        foreignKey: 'IDrank', // Khóa ngoại trong bảng thisinh tham chiếu đến rank
        sourceKey: 'id', // Khoá chính trong bảng rank
      });
    }
  }
  
  rank.init({
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
    modelName: 'rank',
    tableName: 'rank',
    timestamps: false,
  });
  
  return rank;
};
