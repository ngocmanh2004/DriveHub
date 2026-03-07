'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class userstoredetect extends Model {
    static associate(models) {
      // Một userstoredetect có nhiều Detect
      userstoredetect.hasMany(models.detect, {
        foreignKey: 'userstoredetectId',
        as: 'detects'
      });
    }
  }

  userstoredetect.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'userstoredetect',
    tableName: 'userstoredetect',
    timestamps: true,
  });

  return userstoredetect;
};
