'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [
      {
        id: 1,
        email: 'admin@gmail.com',
        password: '$2a$10$bbatJKaeyCK2MLNeYK5guO.LrYpQ11TQBrbpXNHBgIMznDZNgI0vK',
        username: 'KhaVy',
        address: null,
        phone: null,
        image: null,
        genderId: 1,
        groupId: 1,
        googleId: null,
        githubId: null,
        facebookId: null,
        active: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {T
    await queryInterface.bulkDelete('user', null, {});
    await queryInterface.sequelize.query('ALTER TABLE `user` AUTO_INCREMENT = 1');
  },
};