'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class exam extends Model {
    static associate(models) {
      // Một exam thuộc về một thí sinh (1 exam -> 1 thisinh)
      exam.belongsTo(models.thisinh, {
        foreignKey: 'IDThisinh',  // Khóa ngoại trong bảng exam
        targetKey: 'IDThiSinh',   // Khóa chính trong bảng thisinh
      });

      // Một exam thuộc về một bài kiểm tra (1 exam -> 1 test)
      exam.belongsTo(models.test, {
        foreignKey: 'IDTest',      // Khóa ngoại trong bảng exam
        targetKey: 'id',           // Khóa chính trong bảng test
      });

      // Một exam thuộc về một môn học (1 exam -> 1 subject)
      exam.belongsTo(models.subject, {
        foreignKey: 'IDSubject', // Khóa ngoại trong bảng exam
        targetKey: 'id',         // Khóa chính trong bảng subject
      });
      
    }
  }

  exam.init({
    // id - Khóa chính tự động tăng
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ID của thí sinh
    IDThisinh: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // ID của bài kiểm tra
    IDTest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // Danh sách các câu trả lời đã chọn
    answerlist: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Điểm của bài thi
    point: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    // Kết quả bài thi (thành công/ không thành công, ví dụ)
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IDSubject: {
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
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'exam',
    tableName: 'exam',
    timestamps: true, // Sequelize sẽ tự động tạo các trường createdAt, updatedAt
  });

  return exam;
};
