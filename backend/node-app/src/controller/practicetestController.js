
const { execFile } = require('child_process');
const path = require('path');
import practicetestService from "../service/practicetestService";
import fs from 'fs';

// Hàm chạy file .exe
function runEncryptionUtility(mode, input) {
    console.log('check __dirname', __dirname)
    const exePath = path.join(__dirname, "../C#/encryption/encryptionTestPractice.exe");
    if (!fs.existsSync(exePath)) {
        throw new Error(`File .exe không tồn tại tại đường dẫn: ${exePath}`);
    }
    const command = process.platform === "win32" ? exePath : `wine ${exePath}`;
    return new Promise((resolve, reject) => {
        execFile(command, [mode, input], (error, stdout, stderr) => {
            if (error) {
                console.log('check error', error)
                reject(error);
            } else if (stderr) {
                reject(new Error(stderr));
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

const receiveTestPractice = async (req, res) => {
    try {
        const { data } = req.body;
        const dataRes = await practicetestService.receiveTestPractice(data);
        return res.status(200).json({
            EM: dataRes.EM,//error message
            EC: dataRes.EC,//error code
            DT: dataRes.DT
        });
    } catch (error) {
        console.error('Lỗi trong quá trình xử lý:', error);
        return res.status(500).json({
            EM: 'Lỗi từ server',
            EC: -1,
            DT: [],
        });
    }
};


module.exports = {
    receiveTestPractice
}