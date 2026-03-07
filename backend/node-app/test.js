const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

// Đường dẫn ảnh đầu vào
const imagePath = path.resolve('D:\\Code\\Electron\\IMAGETEST\\z6243239754395_e994f811a6963e68f7e184096e434739.jpg');
// Thư mục lưu kết quả
const outputDir = path.resolve('D:\\Code\\Electron\\IMAGETEST\\output');

// Tạo thư mục lưu kết quả nếu chưa tồn tại
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Gọi Python script
exec(`python process_image.py "${imagePath}" "${outputDir}"`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }

  console.log(`Output:\n${stdout}`);
});
