import db from "../models/index.js"; // Sequelize models
require("dotenv").config();
const { Op, Model } = require("sequelize");
const fs = require('fs');
const path = require('path');

const updatePrintStatus = async (IDThiSinh, print) => {
    try {
        // Tìm thí sinh theo IDThiSinh
        const thiSinh = await db.thisinh.findOne({
            where: { IDThiSinh: IDThiSinh },
        });

        if (!thiSinh) {
            return ({
                EM: 'Không tìm thấy thí sinh với ID này',
                EC: -1,
                DT: [],
            });
        }

        // Cập nhật trạng thái print
        await db.thisinh.update(
            { print: print }, // Cập nhật print = 2
            { where: { IDThiSinh: IDThiSinh } }
        );

        // Lấy lại thông tin thí sinh sau khi cập nhật
        const updatedThiSinh = await db.thisinh.findOne({
            where: { IDThiSinh: IDThiSinh },
        });

        return ({
            EM: 'Cập nhật trạng thái in thành công',
            EC: 0,
            DT: updatedThiSinh,
        });
        
    } catch (error) {
        console.log('check error', error)
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        });
    }
};

export default {
    updatePrintStatus
};