module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Bước 1: Xóa toàn bộ dữ liệu trong cột 'Anh'
    await queryInterface.sequelize.query('UPDATE thisinh SET Anh = NULL'); // Hoặc bạn có thể dùng DELETE nếu muốn xóa toàn bộ bảng

    // Bước 2: Thay đổi kiểu dữ liệu của cột 'Anh' từ BLOB thành STRING
    await queryInterface.changeColumn('thisinh', 'Anh', {
      type: Sequelize.STRING(255),  // Kiểu dữ liệu mới
      allowNull: true,  // Cho phép NULL
      defaultValue: null  // Giá trị mặc định là null
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Hủy thay đổi: Xóa dữ liệu trong cột 'Anh'
    await queryInterface.sequelize.query('UPDATE thisinh SET Anh = NULL'); // Hoặc DELETE nếu cần

    // Hoàn tác việc thay đổi kiểu cột, đưa cột về kiểu BLOB
    await queryInterface.changeColumn('thisinh', 'Anh', {
      type: Sequelize.BLOB, // Kiểu dữ liệu cũ (BLOB)
      allowNull: true,  // Cho phép NULL
      defaultValue: null  // Giá trị mặc định là null
    });
  }
};
