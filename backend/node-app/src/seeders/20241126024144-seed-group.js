'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('group', [
      {
        name: 'SupperAdmin',
        description: "Quyền ADMIN lớn nhất",
      },
      {
        name: 'Admin',
        description: "Quyền ADMIN",
      },
      {
        name: 'User',
        description: "Quyền User",
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('group', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `group` AUTO_INCREMENT = 1');
  }
};
