'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('subject', [
      {
        name: 'Pháp luật giao thông đường bộ',
        numberofquestion: '10',
        nameEx:'PLGTDB'
      },
      {
        name: 'Cấu tạo và sửa chữa thông thường',
        numberofquestion: '10',
        nameEx:'CauTao'
      },
      {
        name: 'Nghiệp vụ vận tải',
        numberofquestion: '10',
        nameEx:'KTLX'
      },
      {
        name: 'Đạo đức người lái xe và văn hóa giao thông',
        numberofquestion: '10',
         nameEx:'DaoDuc'
      },
      {
        name: 'Kỹ thuật lái xe',
        numberofquestion: '10',
         nameEx:'NVVT'
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('subject', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `subject` AUTO_INCREMENT = 1');
  }
};
