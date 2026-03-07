module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('subject', 'threshold', {
      type: Sequelize.INTEGER,
      defaultValue: 5   // Thêm giá trị mặc định
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('subject', 'threshold', {
      type: Sequelize.INTEGER,
      allowNull: true,   // Xóa ràng buộc `NOT NULL`
      defaultValue: null // Xóa giá trị mặc định
    });
  }
};