import db from "../models/index.js"; // Sequelize models
const { execFile } = require('child_process');
const path = require('path');
const { Op, Model } = require("sequelize");
import { sendStatusUpdate } from '../websocket/wsStudentStatusServer.js';
import userStatusController from '../controller/userStatusController.js';
import fs from 'fs';


const encryptBase64 = (plainText) => {
    return Buffer.from(plainText).toString('base64');
};

const decryptBase64 = (encodedText) => {
    return Buffer.from(encodedText, 'base64').toString('utf8');
};

const receiveTestPractice = async (data) => {
    try {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return res.status(400).json({
                EM: 'Dữ liệu không hợp lệ hoặc trống', // Error message
                EC: 2, // Error code
                DT: [],
            });
        }

        const results = [];
        const updatedRecords = []; // Mảng lưu thông tin các bản ghi đã cập nhật

        for (const record of data) {
            const { SBD, Ma_DV } = record;
            console.log('check startup ', SBD, Ma_DV)
            let SBD_decrypted;
            try {
                SBD_decrypted = decryptBase64(SBD);
                console.log('Decrypted SBD:', SBD_decrypted);
            } catch (decryptError) {
                console.error('Lỗi khi giải mã SBD:', decryptError.message);
                results.push({ Ma_DV, SBD, status: 'decryption_failed' });
                continue;
            }

            if (!!SBD_decrypted && !!Ma_DV) {
                const updated = await db.khoahoc_thisinh.update(
                    {
                        IDstatus: null,
                        stt: null,
                    },
                    {
                        where: {
                            SoBaoDanh: SBD_decrypted,
                            IDKhoaHoc: Ma_DV,
                        },
                    }
                );

                if (updated[0] > 0) {
                    console.log(`Đã cập nhật bản ghi với SBD: ${SBD_decrypted}, Ma_DV: ${Ma_DV}`);
                    updatedRecords.push({ SoBaoDanh: SBD_decrypted, IDKhoaHoc: Ma_DV });
                } else {
                    console.warn(`Không tìm thấy bản ghi với SBD: ${SBD_decrypted}, Ma_DV: ${Ma_DV}`);
                }
            } else {
                console.warn('Bản ghi thiếu thông tin hợp lệ:', record);
            }
        }

        // Lấy danh sách tất cả thí sinh đã được cập nhật
        if (updatedRecords.length > 0) {
            // Gửi thông báo qua WebSocket hoặc API
            const course = await db.khoahoc.findAll({ raw: true, order: [['NgayThi', 'DESC']] })
            if (course.length > 0) {
                console.log('check course[0].IDKhoaHoc', course[0].IDKhoaHoc)
                const updatedStudents = await userStatusController.getThiSinhSBDOfCourse(course[0].IDKhoaHoc, updatedRecords.map(e => e.SoBaoDanh));
                // console.log('check updatedStudents', JSON.stringify(updatedStudents))
                await sendStatusUpdate(updatedStudents);
            }

        } else {
            console.log('Không có bản ghi nào được cập nhật.');
        }
        return ({
            EM: 'Processed successfully',
            EC: 0,
            DT: results,
        });
    } catch (error) {
        console.error('Lỗi trong quá trình xử lý:', error);
        return ({
            EM: 'Lỗi từ server',
            EC: -1,
            DT: '',
        });
    }
};


module.exports = {
    receiveTestPractice
}