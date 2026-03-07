import db from "../models/index.js"; // Sequelize models
const { Op, Model } = require("sequelize");
import XLSX from 'xlsx';

const createOrUpdateQuestion = async (file) => {
    try {
        if (!file) {
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });
        }

        // Đọc dữ liệu từ file Excel
        const workbook = XLSX.read(file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];

        // Chuyển dữ liệu trong sheet thành mảng JSON
        const data = XLSX.utils.sheet_to_json(sheet);
        // Lấy dữ liệu hiện tại từ cơ sở dữ liệu
        const existing600question = await db.question.findAll({
            raw: true
        });

        const existing600questionMap = new Map(
            existing600question.map((t) => [t.number, t])
        );
        // Duyệt qua từng dòng trong dữ liệu
        for (let row of data) {
            let name = row['Câu']; // Tên câu hỏi
            let answerText = row['Đ.án']; // Đáp án
            if (!!name && !!answerText) {

                let numberName = parseInt(name)
                let numberAnswer = parseInt(answerText);

                if (existing600questionMap.has(numberName)) {
                    // Nếu câu hỏi đã tồn tại, cập nhật đáp án
                    await db.question.update(
                        { answer: numberAnswer }, // Dữ liệu cần cập nhật
                        { where: { number: numberName } } // Điều kiện `where`
                    );
                    console.log(`Cập nhật đáp án cho câu hỏi: ${numberName}`);
                } else {
                    // Nếu câu hỏi chưa tồn tại, tạo mới câu hỏi và đáp án
                    await db.question.create({
                        number: numberName,
                        answer: numberAnswer,
                    });
                    console.log(`Tạo mới câu hỏi: ${name}`);
                }
            }
        }

        return ({
            EM: "Tạo câu hỏi thành công!",
            EC: 0,
            DT: []
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


const updateRankStudentWithExcelService = async (file) => {
    try {
        if (!file) {
            return {
                EM: "File không được gửi lên!",
                EC: 2,
                DT: [],
            };
        }

        // Đọc dữ liệu từ file Excel
        const workbook = XLSX.read(file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0]; // Lấy sheet đầu tiên
        const sheet = workbook.Sheets[sheetName];

        // Chuyển dữ liệu trong sheet thành mảng JSON
        const data = XLSX.utils.sheet_to_json(sheet);

        // Lấy danh sách hạng GPLX hiện có từ database (bảng rank)
        const existingRanks = await db.rank.findAll({
            attributes: ["name"], // Chỉ lấy cột name (hạng GPLX, ví dụ: B2, C,...)
            raw: true,
        });

        // Tạo một Set chứa các hạng hợp lệ để kiểm tra nhanh
        const validRankSet = new Set(existingRanks.map((rank) => rank.name));

        // Lấy danh sách thí sinh hiện có từ database (bảng student)
        const existingStudents = await db.thisinh.findAll({
            attributes: ["Ma_Dang_Ky"], // Chỉ lấy cột MA_DK
            raw: true,
        });

        // Tạo một Set chứa các MA_DK hợp lệ để kiểm tra nhanh
        const validMaDkSet = new Set(existingStudents.map((student) => student.Ma_Dang_Ky));
        console.log('check hangGplx', validRankSet)
        // Danh sách các lỗi (các trường hợp không cập nhật được)
        const errors = [];
        let notupdate = 0;
        let updatSuccess = 0;
        let allUpdate = 0;
        // Duyệt qua từng dòng trong dữ liệu Excel
        for (const row of data) {
            if (!!row) {
                allUpdate++;
                const maDk = row["Mã học viên"]?.toString().trim(); // Mã đăng ký
                const hangGplx = row["Hạng đào tạo"]?.toString().trim(); // Hạng GPLX
                // Kiểm tra nếu MA_DK hoặc HANG_GPLX không tồn tại
                if (!maDk || !hangGplx) {
                    errors.push(`Dòng dữ liệu thiếu MA_DK hoặc HANG_GPLX: ${JSON.stringify(row)}`);
                    continue;
                }

                // Kiểm tra xem HANG_GPLX có hợp lệ không (có nằm trong bảng rank không)
                if (!validRankSet.has(hangGplx)) {
                    errors.push(`Hạng GPLX không hợp lệ: ${hangGplx} (MA_DK: ${maDk})`);
                    continue;
                }

                // // Kiểm tra xem MA_DK có tồn tại trong bảng student không
                if (!validMaDkSet.has(maDk)) {
                    continue;
                }

                // Cập nhật HANG_GPLX trong bảng student
                const updated = await db.thisinh.update(
                    { loaibangthi: hangGplx }, // Dữ liệu cần cập nhật
                    { where: { Ma_Dang_Ky: maDk } } // Điều kiện where
                );
                // Kiểm tra xem có cập nhật thành công không
                if (updated[0] === 0) {
                    notupdate++;
                } else {
                    console.log(`Đã cập nhật hạng GPLX: ${hangGplx} cho MA_DK: ${maDk}`);
                    updatSuccess++;
                }
            }

        }

        // Trả về kết quả
        return {
            EM: `Tất cả ${allUpdate}/ Không cập nhật: ${notupdate} - Cập nhật:${updatSuccess} -${JSON.stringify(errors)}`,
            EC: 0, // Trả về mã lỗi 1 để báo có lỗi xảy ra
            DT: [], // Trả về danh sách lỗi
        };

    } catch (error) {
        console.error("Lỗi trong quá trình xử lý dữ liệu:", error);
        return {
            EM: "Có lỗi xảy ra trong quá trình xử lý!",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    createOrUpdateQuestion,
    updateRankStudentWithExcelService
}