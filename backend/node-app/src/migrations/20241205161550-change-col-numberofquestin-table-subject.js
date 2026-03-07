module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('subject', 'numberofquestion', {
      type: Sequelize.INTEGER,
      defaultValue: 10   // Thêm giá trị mặc định
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('subject', 'numberofquestion', {
      type: Sequelize.INTEGER,
      allowNull: true,   // Xóa ràng buộc `NOT NULL`
      defaultValue: null // Xóa giá trị mặc định
    });
  }
};