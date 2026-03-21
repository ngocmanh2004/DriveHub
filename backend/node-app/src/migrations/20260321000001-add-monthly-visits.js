'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('visitor_stats', 'monthly_visits', {
      type: Sequelize.BIGINT,
      defaultValue: 0,
      allowNull: false,
    });
    await queryInterface.addColumn('visitor_stats', 'monthly_reset_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  async down(queryInterface) {
    await queryInterface.removeColumn('visitor_stats', 'monthly_visits');
    await queryInterface.removeColumn('visitor_stats', 'monthly_reset_at');
  }
};
