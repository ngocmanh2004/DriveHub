'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Thêm cột 'type' vào bảng 'CourseQR'
    await queryInterface.addColumn('CourseQR', 'type', {
      type: Sequelize.ENUM(
        'CCCD',
        'GPLX',
        'BANK_VIETQR',
        'BILL_QR',
        'E_GOV',
        'HEALTH_QR',
        'E_TICKET',
        'WAYBILL',
        'PRODUCT_QR',
        'VOUCHER',
        'OTHER'
      ),
      allowNull: false,
      defaultValue: 'CCCD',
      comment: 'Phân loại QR theo nghiệp vụ cho toàn bộ khóa học này',
    });

    // 2. (Tùy chọn) Chuyển đổi dữ liệu nếu bạn có dữ liệu cũ
    // Sửa lỗi cú pháp SQL cho MySQL bằng cách dùng backticks (`)
    await queryInterface.sequelize.query(
      `UPDATE \`CourseQR\` SET \`type\` = 'CCCD';`
    );

    // 3. Xóa cột 'type' khỏi bảng 'QR'
    await queryInterface.removeColumn('QR', 'type');

    // Nếu bạn đang dùng Postgres, bạn cần xóa type ENUM cũ
    // Phần này vẫn giữ nguyên, nhưng sẽ không chạy nếu bạn đang dùng MySQL
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_QR_type";');
    }
  },

  async down(queryInterface, Sequelize) {
    // Để đảo ngược migration, ta phải thực hiện các bước ngược lại
    
    // 1. Thêm lại cột 'type' vào bảng 'QR'
    // Lưu ý: Bạn có thể cần tạo lại ENUM type cho Postgres
    if (queryInterface.sequelize.getDialect() === 'postgres') {
      await queryInterface.sequelize.query('CREATE TYPE "enum_QR_type" AS ENUM (\'CCCD\', \'GPLX\', \'BANK_VIETQR\', \'BILL_QR\', \'E_GOV\', \'HEALTH_QR\', \'E_TICKET\', \'WAYBILL\', \'PRODUCT_QR\', \'VOUCHER\', \'OTHER\');');
    }
    
    await queryInterface.addColumn('QR', 'type', {
      type: Sequelize.ENUM(
        'CCCD',
        'GPLX',
        'BANK_VIETQR',
        'BILL_QR',
        'E_GOV',
        'HEALTH_QR',
        'E_TICKET',
        'WAYBILL',
        'PRODUCT_QR',
        'VOUCHER',
        'OTHER'
      ),
      allowNull: false,
      defaultValue: 'CCCD',
      comment: 'Phân loại QR theo nghiệp vụ: CCCD/GPLX/Thanh toán/Hoá đơn/DVC/Y tế/Vé/Vận đơn/Sản phẩm/Voucher/Khác',
    });

    // 2. Xóa cột 'type' khỏi bảng 'CourseQR'
    await queryInterface.removeColumn('CourseQR', 'type');
  },
};