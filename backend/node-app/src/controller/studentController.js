import studentService from "../service/studentService";

const updatePrintStatus = async (req, res) => {
    try {
        const { IDThiSinh, print } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!IDThiSinh || print === undefined) {
            return res.status(400).json({
                EM: 'Thiếu thông tin IDThiSinh hoặc print',
                EC: -1,
                DT: [],
            });
        }
        const data = await studentService.updatePrintStatus(IDThiSinh, print);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });

    } catch (error) {
        console.error("Lỗi khi cập nhật trạng thái in:", error);
        return res.status(500).json({
            EM: 'Lỗi khi cập nhật trạng thái in',
            EC: -1,
            DT: [],
        });
    }
};


module.exports = {
    updatePrintStatus
}