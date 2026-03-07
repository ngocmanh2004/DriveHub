'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [
      {
        namestatus: 'Đã duyệt - LT'
      },
      {
        namestatus: 'Thi xong - LT'
      },
      {
        namestatus: 'Đã duyệt - TH'
      },
      {
        namestatus: 'Thi xong - TH'
      },
      {
        namestatus: '=> Thi đường trường'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `status` AUTO_INCREMENT = 1');
  }
};
