'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class detect extends Model {
    static associate(models) {
      // Một detect chỉ thuộc về một userstoredetect
      detect.belongsTo(models.userstoredetect, {
        foreignKey: 'userstoredetectId',
        as: 'userstoredetect'
      });
    }
  }

  detect.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userStoredetectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'detect',
    tableName: 'detect',
    timestamps: true,
  });

  return detect;
};
