// controllers/courseqr.controller.js
import courseQRService from "../service/courseQRService"; // đường dẫn tới service của bạn

// GET /api/courseqr
const getCourseQR = async (req, res) => {
    try {
        const data = await courseQRService.getCourses();
        return res.status(200).json({
            EM: data.EM, // error message
            EC: data.EC, // error code
            DT: data.DT,
        });
    } catch (e) {
        console.error("getCourseQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// POST /api/courseqr
// body: { name, description }
const createCourseQR = async (req, res) => {
    try {
        const payload = {
            name: req.body?.name,
            description: req.body?.description,
        };
        const data = await courseQRService.createCourse(payload);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("createCourseQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// PUT /api/courseqr/:id
// body: { name?, description? }
const updateCourseQR = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = {
            name: req.body?.name,
            description: req.body?.description,
        };
        const data = await courseQRService.updateCourse(id, payload);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("updateCourseQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// DELETE /api/courseqr/:id
// Chỉ xóa khi KHÔNG có QR nào thuộc khóa học đó
const deleteCourseQR = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await courseQRService.deleteCourse(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("deleteCourseQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

module.exports = {
    getCourseQR,
    createCourseQR,
    updateCourseQR,
    deleteCourseQR,
};
