import db from "../models/index.js"; // Sequelize models
const { Op, Model } = require("sequelize");
import userServices from "./userServices.js";
const getSubject = async (rankId, showsubject) => {
    try {

        if (!rankId)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        let whereClause = { IDrank: rankId }
        if (showsubject !== undefined) {
            whereClause.showsubject = showsubject === 'true'; // Chuyển đổi thành kiểu boolean nếu cần
        }

        const subjects = await db.subject.findAll({
            where: whereClause
        });

        return ({
            EM: 'update success',//error message
            EC: 0,//error code
            DT: subjects
        });
    } catch (e) {
        console.error("check error: ", e);
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: ''
        })
    }
}

const createSubject = async (name, rankId, threshold, nameEx, numberofquestion, showsubject, timeFinish) => {
    try {

        if (!name || !rankId || !threshold || !nameEx || !numberofquestion ||
            !timeFinish) {
            return ({
                EM: 'Null select',//error message
                EC: 1,//error code
                DT: []
            });
        }
        const newSubject = await db.subject.create({ name, IDrank: rankId, threshold, nameEx, numberofquestion, showsubject, timeFinish });
        return ({
            EM: 'create success',//error message
            EC: 0,//error code
            DT: newSubject
        });
    } catch (error) {
        console.log('chekc error', error)
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: ''
        })
    }
};

const updateSubject = async (IDsubject, rankId, name, threshold, nameEx, showsubject, timeFinish) => {
    try {
        if (!IDsubject || !name || !threshold || !nameEx || !timeFinish)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        const subject = await db.subject.findByPk(IDsubject);
        if (!subject) {
            return ({
                EM: 'Cant get subject',//error message
                EC: 1,//error code
                DT: []
            });
        }
        const updateRank = await subject.update({
            name,
            threshold,
            nameEx,
            // numberofquestion,
            showsubject,
            timeFinish
        });
        return ({
            EM: 'update success',//error message
            EC: 0,//error code
            DT: updateRank
        });
    } catch (error) {
        console.log('check err', error)
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        });
    }
};

const getTestFromSubject = async (IDSubject) => {
    try {

        if (!IDSubject)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        const subjects = await db.test.findAll({
            where: { IDSubject }
        });

        return ({
            EM: 'update success',//error message
            EC: 0,//error code
            DT: subjects
        });
    } catch (e) {
        console.error("check error: ", e);
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        })
    }
}

const getSubjectStudentHaventTestYet = async (IDThiSinh) => {
    try {

        if (!IDThiSinh)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        const student = await userServices.getInfoStudentServices(null, null, IDThiSinh)
        if (student.DT.length && student.EC == 0) {

            console.log('check student', student)
            return ({
                EM: 'Stundet not found',//error message
                EC: 1,//error code
                DT: []
            });
        } else {
            return ({
                EM: 'Stundet not found',//error message
                EC: 1,//error code
                DT: []
            });
        }

    } catch (e) {
        console.error("check error: ", e);
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        })
    }
}

module.exports = {
    getSubject,
    createSubject,
    updateSubject,
    getTestFromSubject,
    getSubjectStudentHaventTestYet
}