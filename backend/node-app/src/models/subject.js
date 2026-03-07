'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    static associate(models) {
      // Quan hệ một-nhiều với test
      subject.hasMany(models.test, {
        foreignKey: 'IDSubject',
      });

      subject.hasMany(models.test_question, {
        foreignKey: 'IDsubject',
      });

      subject.belongsTo(models.rank, {
        foreignKey: 'IDrank'
      });
      subject.hasMany(models.exam, {
        foreignKey: 'IDSubject', // Khóa ngoại trong bảng exam
      });

    }
  }

  subject.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberofquestion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    threshold: {
      type: DataTypes.INTEGER,
    },
    IDrank: {
      type: DataTypes.INTEGER,
    },
    nameEx: {
      type: DataTypes.STRING,
    },
    showsubject: {
      type: DataTypes.BOOLEAN,
    },
    timeFinish: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'subject',
    tableName: 'subject',
    timestamps: true,
  });

  return subject;
};
