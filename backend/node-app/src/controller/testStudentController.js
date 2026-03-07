import testStudentService from "../service/testStudentService.js"

const getSubject = async (req, res) => {
    try {
        const data = await testStudentService.getSubject();
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });

    } catch (e) {
        console.error("check getSubject: ", e);
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        })
    }
}

// Hàm xử lý đọc file Excel và chèn dữ liệu vào cơ sở dữ liệu
const processExcelAndInsert = async (req, res) => {
    try {
        const file = req.file;
        const { IDrank } = req.body;
        const data = await testStudentService.processExcelAndInsert(file, IDrank);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        })
    }
};

const getTest = async (req, res) => {
    try {
        const { IDTest } = req.params;
        const data = await testStudentService.getTest(IDTest);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (e) {
        console.error("check error: ", e);
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: ''
        })
    }
}

module.exports = {
    getSubject,
    processExcelAndInsert,
    getTest
}