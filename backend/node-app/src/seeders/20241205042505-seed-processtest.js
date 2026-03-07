'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('processtest', [
      {
        name: 'Chưa thi',
      },
      {
        name: 'Đang thi',
      },
      {
        name: 'Hoàn thành',
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processtest', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `processtest` AUTO_INCREMENT = 1');
  }
};
