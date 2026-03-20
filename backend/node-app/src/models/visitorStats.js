'use strict';
module.exports = (sequelize, DataTypes) => {
  const visitorStats = sequelize.define('visitorStats', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    total_visits: { type: DataTypes.BIGINT, defaultValue: 0 },
    current_online: { type: DataTypes.INTEGER, defaultValue: 0 },
    peak_online: { type: DataTypes.INTEGER, defaultValue: 0 },
    peak_online_at: { type: DataTypes.DATE, allowNull: true },
    last_visit_at: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'visitor_stats',
    timestamps: true,
  });
  return visitorStats;
};
