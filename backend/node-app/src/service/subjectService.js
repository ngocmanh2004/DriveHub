import db from "../models/index.js"; // Sequelize models
const { Op, Model } = require("sequelize");
import userServices from "./userServices.js";
const cache = require('../cache/memoryCache');

const getSubject = async (rankId, showsubject) => {
    if (!rankId) return ({ EM: 'Some Field Null', EC: 2, DT: [] });

    const CACHE_KEY = `subjects_${rankId}_${showsubject ?? 'all'}`;
    const cached = cache.get(CACHE_KEY);
    if (cached) return cached;

    try {
        let whereClause = { IDrank: rankId };
        if (showsubject !== undefined) {
            whereClause.showsubject = showsubject === 'true';
        }
        const subjects = await db.subject.findAll({ where: whereClause });
        const result = { EM: 'update success', EC: 0, DT: subjects };
        cache.set(CACHE_KEY, result, 15 * 60 * 1000); // cache 15 phút
        return result;
    } catch (e) {
        console.error("check error: ", e);
        return ({ EM: 'error from sever', EC: -1, DT: '' });
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
        cache.invalidatePrefix('subjects_');
        return ({ EM: 'create success', EC: 0, DT: newSubject });
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
        const updateRank = await subject.update({ name, threshold, nameEx, showsubject, timeFinish });
        cache.invalidatePrefix('subjects_');
        return ({ EM: 'update success', EC: 0, DT: updateRank });
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
    if (!IDSubject) return ({ EM: 'Some Field Null', EC: 2, DT: [] });

    const CACHE_KEY = `tests_subject_${IDSubject}`;
    const cached = cache.get(CACHE_KEY);
    if (cached) return cached;

    try {
        const tests = await db.test.findAll({ where: { IDSubject } });
        const result = { EM: 'update success', EC: 0, DT: tests };
        cache.set(CACHE_KEY, result, 15 * 60 * 1000);
        return result;
    } catch (e) {
        console.error("check error: ", e);
        return ({ EM: 'error from sever', EC: -1, DT: [] });
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

const deleteSubject = async (id) => {
    try {
        if (!id) return ({ EM: 'Some Field Null', EC: 2, DT: [] });

        const subject = await db.subject.findByPk(id);
        if (!subject) return ({ EM: 'Cant find subject', EC: 1, DT: [] });

        await subject.destroy();
        cache.invalidatePrefix('subjects_');
        return ({ EM: 'delete success', EC: 0, DT: [] });
    } catch (error) {
        console.log('deleteSubject error', error);
        return ({ EM: 'error from sever', EC: -1, DT: [] });
    }
};

module.exports = {
    getSubject,
    createSubject,
    updateSubject,
    deleteSubject,
    getTestFromSubject,
    getSubjectStudentHaventTestYet
}