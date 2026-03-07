// services/course.service.js
import db from "../models/index.js"; // Sequelize models
const { Op } = require("sequelize");

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

const getCourses = async () => {
    try {
        const courses = await db.courseqr.findAll({
            order: [["createdAt", "DESC"]],
            // attributes giữ nguyên; nếu muốn ẩn description thì chỉnh attributes tại đây
        });

        // Tính qrCount cho từng khóa (đơn giản, dễ đọc)
        const withCounts = await Promise.all(
            courses.map(async (c) => {
                const count = await db.qr.count({ where: { courseId: c.id } });
                return {
                    ...c.get({ plain: true }),
                    qrCount: count,
                };
            }));

        return {
            EM: "List Courses",
            EC: 0,
            DT: withCounts,
        };
    } catch (e) {
        console.error("getCourses error:", e);
        return {
            EM: "error from server",
            EC: -1,
            DT: [],
        };
    }
};

/**
 * Tạo khóa học mới
 * @param {Object} payload { name, description }
 */
const createCourse = async (payload = {}) => {
    try {
        const { name, description, type = 'CCCD' } = payload;

        if (!name || !name.trim()) {
            return {
                EM: "Some Field Null",
                EC: 2,
                DT: [],
            };
        }
        if (!ALLOWED_TYPES.has(type)) {
            return {
                EM: "Type not valid",
                EC: 1,
                DT: [],
            };
        }
        const newCourse = await db.courseqr.create({
            name: name.trim(),
            description: description || null,
            type
        });

        return {
            EM: "create success",
            EC: 0,
            DT: newCourse,
        };
    } catch (e) {
        console.error("createCourse error:", e);
        return {
            EM: "error from server",
            EC: -1,
            DT: [],
        };
    }
};

/**
 * Cập nhật khóa học
 * @param {number} id
 * @param {Object} payload { name, description }
 */
const updateCourse = async (id, payload = {}) => {
    try {
        const { name, description } = payload;

        if (!id || (!name && typeof description === "undefined")) {
            return {
                EM: "Some Field Null",
                EC: 2,
                DT: [],
            };
        }

        const course = await db.courseqr.findByPk(id);
        if (!course) {
            return {
                EM: "Cant find by ID",
                EC: 1,
                DT: [],
            };
        }

        const updated = await course.update({
            ...(typeof name !== "undefined" ? { name: name?.trim() } : {}),
            ...(typeof description !== "undefined" ? { description } : {}),
        });

        return {
            EM: "update success",
            EC: 0,
            DT: updated,
        };
    } catch (e) {
        console.error("updateCourse error:", e);
        return {
            EM: "error from server",
            EC: -1,
            DT: [],
        };
    }
};

/**
 * Xóa khóa học – CHỈ khi không có QR nào thuộc khóa đó
 * @param {number} id
 */
const deleteCourse = async (id) => {
    try {
        if (!id) {
            return {
                EM: "Some Field Null",
                EC: 2,
                DT: [],
            };
        }

        const course = await db.courseqr.findByPk(id);
        if (!course) {
            return {
                EM: "Cant find by ID",
                EC: 1,
                DT: [],
            };
        }

        const qrCount = await db.qr.count({ where: { courseId: id } });
        if (qrCount > 0) {
            return {
                EM: "Không thể xóa: còn QR thuộc khóa học này",
                EC: 3,
                DT: { qrCount },
            };
        }

        await course.destroy();

        return {
            EM: "delete success",
            EC: 0,
            DT: { id },
        };
    } catch (e) {
        console.error("deleteCourse error:", e);
        return {
            EM: "error from server",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    getCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};
