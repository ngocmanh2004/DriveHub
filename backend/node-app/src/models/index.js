'use strict';
require('dotenv').config(); // Đọc biến môi trường từ file .env

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (process.env.USE_ENV_VARIABLE === 'true') {
  // Nếu bạn muốn ưu tiên cấu hình bằng ENV VARIABLE trong môi trường
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // Sử dụng cấu hình từ ENV hoặc file config.json
  sequelize = new Sequelize(
    process.env.DB_DATABASE || config.database, // Ưu tiên lấy từ env
    process.env.DB_USERNAME || config.username,
    process.env.DB_PASSWORD || config.password,
    {
      host: process.env.DB_HOST || config.host, // Ưu tiên lấy host từ env
      dialect: config.dialect,
      timezone: process.env.TIMEZONE || config.timezone,
      define: config.define,
      logging: false, // Tắt log các câu lệnh SQL
      port: process.env.DB_PORT || config.port || 3306
    },
  );
}

// Tải các model tự động từ thư mục này
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Thiết lập quan hệ giữa các model nếu có
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
