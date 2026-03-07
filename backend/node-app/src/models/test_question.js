'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class test_question extends Model {
    static associate(models) {
      // Quan hệ nhiều-một với subject
      test_question.belongsTo(models.subject, {
        foreignKey: 'IDSubject',
        as: 'subject',
      });
    }
  }

  test_question.init({
    numberquestion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    IDTest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'test',
        key: 'id',
      },
    },
    IDQuestion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'id',
      },
    },
    IDSubject: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'subject',
        key: 'id',
      },
    },
    order: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'test_question',
    tableName: 'test_question',
    timestamps: true,
  });

  return test_question;
};
