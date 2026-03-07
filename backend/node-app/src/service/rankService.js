import db from "../models/index.js"; // Sequelize models
const { Op, Model } = require("sequelize");

const getRank = async () => {
    try {
        let data = await db.rank.findAll({
            include: [{
                model: db.subject,
            }]
        });
        return ({
            EM: 'Info rank',
            EC: 0,
            DT: data,
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


const createRank = async (name) => {
    try {
        if (!name)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        const newRank = await db.rank.create({ name });
        return ({
            EM: 'create success',//error message
            EC: 0,//error code
            DT: newRank
        });
    } catch (error) {
        console.log('chekc error', error)
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        });
    }
};

const updateRank = async (id, name) => {
    try {

        if (!id || !name)
            return ({
                EM: 'Some Field Null',//error message
                EC: 2,//error code
                DT: []
            });

        const rank = await db.rank.findByPk(id);
        if (!rank) {
            return ({
                EM: 'Cant find by ID',//error message
                EC: 1,//error code
                DT: []
            });
        }
        const updateRank = await rank.update({ name });
        return ({
            EM: 'update success',//error message
            EC: 0,//error code
            DT: updateRank
        });
    } catch (error) {
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        });
    }
};


///hết CRUD cơ bản

module.exports = {
    getRank,
    createRank,
    updateRank
}