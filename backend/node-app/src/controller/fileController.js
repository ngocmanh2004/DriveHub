const fs = require('fs-extra');
const path = require('path');
import fileService from "../service/fileService";
const { exec } = require('child_process');
const axios = require("axios");
const FormData = require("form-data");
const targetFolder = path.join(__dirname, '../upload/600cauhoi');  // Đích cuối cùng là thư mục /upload

const nameStandardizationFile = async (req, res) => {
    const sourceFolder = req.body.sourceFolder;  // Đầu vào là đường dẫn thư mục chứa các thư mục con (đường dẫn từ client)
    console.log('check sourceFolder', sourceFolder);


    try {
        // Kiểm tra xem thư mục đích đã tồn tại chưa, nếu chưa thì tạo nó
        await fs.ensureDir(targetFolder);

        // Đệ quy để tìm tất cả các file hình ảnh trong thư mục nguồn
        const findAndMoveImages = async (folderPath) => {
            // Đọc tất cả các tệp và thư mục trong thư mục hiện tại
            const items = await fs.readdir(folderPath);

            for (const item of items) {
                const itemPath = path.join(folderPath, item);
                const stat = await fs.stat(itemPath);

                if (stat.isDirectory()) {
                    // Nếu là thư mục, gọi đệ quy để tìm trong thư mục con
                    await findAndMoveImages(itemPath);
                } else {
                    // Kiểm tra nếu là hình ảnh (có thể mở rộng thêm các định dạng nếu cần)
                    const extname = path.extname(item).toLowerCase();
                    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff']; // Các định dạng ảnh

                    if (validExtensions.includes(extname)) {
                        // Tạo đường dẫn đích cho file mà không thay đổi tên
                        let targetFilePath = path.join(targetFolder, item);

                        // Nếu file đã tồn tại, đổi tên (thêm hậu tố _1, _2...)
                        let fileIndex = 1;
                        while (await fs.pathExists(targetFilePath)) {
                            const nameWithoutExt = path.basename(item, extname);
                            const newFileName = `${nameWithoutExt}_${fileIndex}${extname}`;
                            targetFilePath = path.join(targetFolder, newFileName);
                            fileIndex++;
                        }

                        // Di chuyển file vào thư mục đích
                        await fs.copy(itemPath, targetFilePath);
                        console.log(`File ${item} đã được chuyển vào thư mục ${targetFolder}`);
                    }
                }
            }
        };

        // Bắt đầu đệ quy từ thư mục nguồn
        await findAndMoveImages(sourceFolder);

        res.status(200).json({ message: 'Tất cả các hình ảnh đã được gom vào thư mục thành công!' });
    } catch (error) {
        console.error('Lỗi:', error);
        res.status(500).json({ message: 'Có lỗi xảy ra trong quá trình chuẩn hóa dữ liệu', error: error.message });
    }
};

// API để tạo hoặc cập nhật câu hỏi và đáp án từ bảng đáp án trong file Excel
const createOrUpdateQuestion = async (req, res) => {
    try {
        const file = req?.file; // Dữ liệu file từ client gửi lên (dùng multer để upload file)
        const data = await fileService.createOrUpdateQuestion(file);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý dữ liệu:", error);
        return ({
            EM: "Some error",
            EC: -1,
            DT: []
        });
    }
};

const getAllImagePaths = (parentDir) => {
    try {
        // Đọc nội dung thư mục
        const files = fs.readdirSync(parentDir);

        // Lọc và lấy đường dẫn đầy đủ của các file hình ảnh
        const imagePaths = files
            .filter(file => /\.(jpg|jpeg|png|bmp|gif)$/i.test(file)) // Chỉ lấy file hình ảnh
            .map(file => path.join(parentDir, file)); // Tạo đường dẫn đầy đủ

        return imagePaths; // Trả về mảng đường dẫn file hình ảnh
    } catch (error) {
        console.error('Error reading directory:', error);
        return [];
    }
};

// Hàm xóa toàn bộ file trong thư mục
const clearDirectory = (directory) => {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach((file) => {
            const filePath = path.join(directory, file);
            if (fs.lstatSync(filePath).isFile()) {
                fs.unlinkSync(filePath); // Xóa file
            }
        });
        console.log(`Cleared all files in directory: ${directory}`);
    } else {
        console.log(`Directory does not exist: ${directory}`);
    }
};

const decodeQR = async (req, res) => {
    try {
        const imagePath = req?.file?.path;
        console.log('check imagePath', imagePath)
        // Đọc file ảnh dưới dạng buffer
        if (!imagePath) {
            return res.status(400).json({
                EM: "No image file provided.",
                EC: 1,
                DT: [],
            });
        }

        const apiUrl = `${process.env.PYTHON_API_URL || "http://localhost:8081"}/api/qr/detect-pyzbar`;
        console.log('check apiUrl', apiUrl)

        const form = new FormData();
        form.append("file", fs.createReadStream(imagePath));
        const response = await axios.post(apiUrl, form, {
            headers: {
                ...form.getHeaders(), // Lấy headers từ form-data
            },
        });
        // Kiểm tra kết quả trả về
        if (response?.data && response?.data?.success) {
            return res.status(200).json({
                EM: 'QR codes detected successfully.',
                EC: 0,
                DT: [response?.data],
            });
        } else {
            return res.status(200).json({
                EM: 'No QR codes detected in the images.',
                EC: 1,
                DT: [],
            });
        }

    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({
            EM: 'Some error',
            EC: -1,
            DT: [],
        });
    }
};

const decodeVNID = async (req, res) => {
    try {
        const imagePath = req?.file?.path;
        console.log('check imagePath', imagePath)
        // Đọc file ảnh dưới dạng buffer
        if (!imagePath) {
            return res.status(400).json({
                EM: "No image file provided.",
                EC: 1,
                DT: [],
            });
        }

        const apiUrl = `${process.env.PYTHON_API_URL || "http://localhost:8081"}/api/vnid/detect-info`;
        console.log('check apiUrl', apiUrl)

        const form = new FormData();
        form.append("file", fs.createReadStream(imagePath));
        const response = await axios.post(apiUrl, form, {
            headers: {
                ...form.getHeaders(), // Lấy headers từ form-data
            },
        });
        // Kiểm tra kết quả trả về
        if (response?.data && response?.data?.success) {
            return res.status(200).json({
                EM: 'QR codes detected successfully.',
                EC: 0,
                DT: [response?.data],
            });
        } else {
            return res.status(200).json({
                EM: 'No QR codes detected in the images.',
                EC: 1,
                DT: [],
            });
        }

    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({
            EM: 'Some error',
            EC: -1,
            DT: [],
        });
    }
};

// API để tạo hoặc cập nhật câu hỏi và đáp án từ bảng đáp án trong file Excel
const updateRankStudentWithExcel = async (req, res) => {
    try {
        const file = req?.file; // Dữ liệu file từ client gửi lên (dùng multer để upload file)
        const data = await fileService.updateRankStudentWithExcelService(file);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.error("Lỗi trong quá trình xử lý dữ liệu:", error);
        return ({
            EM: "Some error",
            EC: -1,
            DT: []
        });
    }
};


module.exports = {
    nameStandardizationFile,
    createOrUpdateQuestion,
    decodeQR,
    updateRankStudentWithExcel,
    decodeVNID
};
