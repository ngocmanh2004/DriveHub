'use strict';
const { Model } = require('sequelize');
const fs = require('fs');
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  // Khai báo lớp thisinh trước khi sử dụng thisinh.init
  class thisinh extends Model {
    static associate(models) {
      // Thiết lập quan hệ 1-1 với bảng khoahoc_thisinh
      thisinh.hasOne(models.khoahoc_thisinh, {
        foreignKey: 'IDThiSinh',
      });

      // Quan hệ belongsTo với processtest
      thisinh.belongsTo(models.processtest, {
        foreignKey: 'IDprocesstest',
      });

      // Quan hệ hasMany với exam
      thisinh.hasMany(models.exam, {
        foreignKey: 'IDThisinh', // Đây là khóa ngoại trong bảng exam
        sourceKey: 'IDThiSinh',  // Đây là khóa chính trong bảng thisinh
      });

      thisinh.belongsTo(models.rank,{
        foreignKey:'loaibangthi',
        targetKey:'name'
      })

      thisinh.belongsTo(models.khoahoc,{
        foreignKey:'IDKhoaHoc',
        targetKey:'IDKhoaHoc'
      })
    }

    // Hàm trả về Base64 khi truy xuất dữ liệu
    getAnhBase64() {
      const anhPath = this.getDataValue('Anh');
      if (anhPath) {
        // Đọc tệp hình ảnh và chuyển nó thành Base64 (Giả sử bạn có đường dẫn hợp lệ)
        const imagePath = path.join(__dirname, '../', anhPath); // Đảm bảo đường dẫn đúng
        const imageBuffer = fs.readFileSync(imagePath);
        return imageBuffer.toString('base64');
      }
      return null;
    }

  }

  // Định nghĩa bảng thisinh
  thisinh.init({
    IDThiSinh: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    IDKhoaHoc: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Ma_Dang_Ky: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    Ma_Ky_SH: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    HoTen: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    GioiTinh: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    SoCMT: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    NgaySinh: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    QuocTich: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    DiaChi: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    SucKhoe: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    VanHoa: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    GplxDaCo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    ThamNien: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    SoKm: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    GhiChu: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Anh: {
      type: DataTypes.STRING,
      allowNull: true,
      // Hàm trả về Base64 khi truy xuất dữ liệu
      get() {
        try {
          const anhPath = this.getDataValue('Anh'); // Lấy đường dẫn ảnh từ DB hoặc dữ liệu
          if (anhPath) {
            // Tạo đường dẫn tuyệt đối cho ảnh
            const imagePath = path?.join(__dirname, '../', anhPath);

            // Kiểm tra file tồn tại trước khi đọc
            if (fs.existsSync(imagePath)) {
              const imageBuffer = fs.readFileSync(imagePath); // Đọc nội dung file
              return imageBuffer.toString('base64'); // Chuyển sang Base64
            } else {
            }
          }
          return ""; // Trả về chuỗi rỗng nếu không tìm thấy ảnh hoặc `anhPath` không hợp lệ
        } catch (error) {
          console.error('Lỗi khi xử lý file ảnh:', error.message);
          return ""; // Trả về chuỗi rỗng trong trường hợp xảy ra lỗi
        }
      }
    },
    DuongDanAnh: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    noidungSH: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    loaibangthi: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    IDprocesstest: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    print: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'thisinh',
    tableName: 'thisinh',
    timestamps: false,
  });

  return thisinh;
};
