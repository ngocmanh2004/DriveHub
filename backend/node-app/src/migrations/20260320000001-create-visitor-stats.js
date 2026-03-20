'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('visitor_stats', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      total_visits: { type: Sequelize.BIGINT, defaultValue: 0 },
      current_online: { type: Sequelize.INTEGER, defaultValue: 0 },
      peak_online: { type: Sequelize.INTEGER, defaultValue: 0 },
      peak_online_at: { type: Sequelize.DATE, allowNull: true },
      last_visit_at: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
    // Insert initial row
    await queryInterface.bulkInsert('visitor_stats', [{
      total_visits: 0,
      current_online: 0,
      peak_online: 0,
      peak_online_at: null,
      last_visit_at: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('visitor_stats');
  }
};
