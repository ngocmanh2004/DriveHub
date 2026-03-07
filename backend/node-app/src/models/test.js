'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class test extends Model {
    static associate(models) {
      // Quan hệ nhiều-một với subject
      test.belongsTo(models.subject, {
        foreignKey: 'IDSubject',
      });

      // Quan hệ nhiều-nhiều với question qua bảng trung gian test_question
      test.belongsToMany(models.question, {
        through: 'test_question',
        foreignKey: 'IDTest',
        otherKey: 'IDQuestion',
        as: 'questions',
      });
    }
  }

  test.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    IDSubject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id',
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'test',
    tableName: 'test',
    timestamps: true,
  });

  return test;
};
