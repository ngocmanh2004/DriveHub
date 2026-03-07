// controllers/qrController.js
import qrService from "../service/QRService";

// GET /api/qr?courseId=&type=&q=
const getQR = async (req, res) => {
    try {
        const data = await qrService.getQR(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("getQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// GET /api/qr?courseId=&type=&q=
const getListQR = async (req, res) => {
    try {
        const data = await qrService.getListQR(req.query);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("getQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// POST /api/qr
// body: { courseId, code, description?, type? }
const createQR = async (req, res) => {
    try {
        const data = await qrService.createQR(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("createQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// PUT /api/qr/:id
// body: { courseId?, code?, description?, type? }
const updateQR = async (req, res) => {
    try {
        const data = await qrService.updateQR(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("updateQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

// DELETE /api/qr/:id
const deleteQR = async (req, res) => {
    try {
        
        const { id } = req.params;
        const data = await qrService.deleteQR(id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        });
    } catch (e) {
        console.error("deleteQR error:", e);
        return res.status(500).json({
            EM: "error from server",
            EC: -1,
            DT: "",
        });
    }
};

module.exports = {
    getQR,
    createQR,
    updateQR,
    deleteQR,
    getListQR
};
