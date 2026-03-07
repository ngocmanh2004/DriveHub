// services/qr.service.js
import db from "../models/index.js";
const { Op } = require("sequelize");

// Nếu muốn validate type trước khi lưu
const ALLOWED_TYPES = new Set([
    "CCCD",
    "GPLX",
    "BANK_VIETQR",
    "BILL_QR",
    "E_GOV",
    "HEALTH_QR",
    "E_TICKET",
    "WAYBILL",
    "PRODUCT_QR",
    "VOUCHER",
    "OTHER",
]);

/**
 * Lấy danh sách QR
 * Hỗ trợ lọc: /qr?courseId=1&type=CCCD&q=keyword
 */
const getQR = async (query = {}) => {
    try {
        const { courseId, type, q } = query;

        const where = {};
        if (courseId) where.courseId = courseId;
        if (type) where.type = type; else where.type = "CCCD";
        if (q && String(q).trim()) {
            where[Op.or] = [
                { code: { [Op.like]: `%${q}%` } },
                { description: { [Op.like]: `%${q}%` } },
            ];
        }

        const data = await db.qr.findAll({
            where,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.courseqr,
                    as: "course",
                    attributes: ["id", "name"],
                },
            ],
        });

        return { EM: "Info QR", EC: 0, DT: data };
    } catch (e) {
        console.error("getQR error:", e);
        return { EM: "error from server", EC: -1, DT: [] };
    }
};

const getListQR = async (query = {}) => {
    try {

        console.log('check query', query)
        const { courseId, q } = query;

        const where = {};
        if (courseId) where.courseId = courseId;
        if (q && String(q).trim()) {
            where[Op.or] = [
                { code: { [Op.like]: `%${q}%` } },
                { description: { [Op.like]: `%${q}%` } },
            ];
        }

        const data = await db.qr.findAll({
            where,
            order: [["createdAt", "DESC"]],
            include: [
                {
                    model: db.courseqr,
                    as: "course",
                    attributes: ["id", "name"],
                },
            ],
        });

        return { EM: "Info QR", EC: 0, DT: data };
    } catch (e) {
        console.error("getQR error:", e);
        return { EM: "error from server", EC: -1, DT: [] };
    }
};


/**
 * Tạo QR
 * payload: { courseId, code, description?, type? }
 */
const createQR = async (payload = {}) => {
    try {
        const { courseId, code, description = null } = payload;

        if (!courseId || !code) {
            return { EM: "Some Field Null", EC: 2, DT: [] };
        }

        // Kiểm tra Course tồn tại
        const course = await db.courseqr.findByPk(courseId);
        if (!course) {
            return { EM: "Course not found", EC: 1, DT: [] };
        }

        console.log('check code', JSON.stringify(code))
        const stringCode = JSON.stringify(code);
        const newQR = await db.qr.create({ courseId, code: stringCode, description });
        return { EM: "create success", EC: 0, DT: newQR };
    } catch (e) {
        console.error("createQR error:", e);
        return { EM: "error from server", EC: -1, DT: [] };
    }
};

/**
 * Cập nhật QR
 * payload: { courseId?, code?, description?, type? }
 */
const updateQR = async (payload = {}) => {
    try {
        console.log('check payload', payload)

        const studentData = payload?.studentData;
        if (!studentData || !studentData.id) {
            return { EM: "Dont get student", EC: 1, DT: [] };
        }

        const qr = await db.qr.findByPk(studentData.id);
        if (!qr) {
            return { EM: "Cant find by ID", EC: 1, DT: [] };
        }
        delete studentData.id;
        const updated = await qr.update({
            code: JSON.stringify(studentData)
        }, {

        });

        return { EM: "update success", EC: 0, DT: updated };
    } catch (e) {
        console.error("updateQR error:", e);
        return { EM: "error from server", EC: -1, DT: [] };
    }
};

/**
 * Xóa QR
 */
const deleteQR = async (id) => {
    try {
        if (!id) {
            return { EM: "Some Field Null", EC: 2, DT: [] };
        }
        console.log('check id', id)
        const qr = await db.qr.findByPk(id);
        if (!qr) {
            return { EM: "Cant find by ID", EC: 1, DT: [] };
        }

        await qr.destroy();
        return { EM: "delete success", EC: 0, DT: { id } };
    } catch (e) {
        console.error("deleteQR error:", e);
        return { EM: "error from server", EC: -1, DT: [] };
    }
};

module.exports = {
    getQR,
    createQR,
    updateQR,
    deleteQR,
    getListQR
};
