'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rank', [
      {
        name: 'C',
      },
      {
        name: 'B2',
      },
      {
        name: 'B11',
      },
      {
        name: 'FC',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('rank', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `rank` AUTO_INCREMENT = 1');
  }
};
