// Hàm lưu hình ảnh
const fs = require('fs-extra');
const path = require('path');

const saveBase64Image = async (base64String, studentId) => {
    try {
        // Tạo thư mục ImageStudent nếu chưa tồn tại
        const directoryPath = path.join(__dirname, '../asset/ImageStudent');
        await fs.ensureDir(directoryPath); // Đảm bảo thư mục tồn tại

        // Tạo tên tệp từ mã đăng ký học viên (studentId)
        const fileName = `${studentId}.jpg`;  // Bạn có thể thay đổi đuôi tệp tùy theo loại hình ảnh (JPG, PNG, v.v.)
        const filePath = path.join(directoryPath, fileName);  // Đường dẫn tệp lưu trong thư mục ImageStudent

        // Tách Base64 và lấy phần dữ liệu hình ảnh
        const base64Data = base64String?.replace(/^data:image\/\w+;base64,/, ''); // Xoá phần tiền tố 'data:image/jpeg;base64,'

        // Giải mã Base64 và lưu hình ảnh vào tệp
        await fs.writeFile(filePath, base64Data, 'base64');

        console.log('Hình ảnh đã được lưu thành công:', filePath);

        // Trả về đường dẫn tương đối để lưu vào cơ sở dữ liệu
        return `/asset/ImageStudent/${fileName}`;

    } catch (error) {
        console.error('Có lỗi khi lưu hình ảnh:', error);
        return ;
    }
};

export default {
    saveBase64Image
}