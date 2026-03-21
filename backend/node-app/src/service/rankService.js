import db from "../models/index.js"; // Sequelize models
const { Op, Model } = require("sequelize");
const cache = require('../cache/memoryCache');

const getRank = async () => {
    const CACHE_KEY = 'ranks_all';
    const cached = cache.get(CACHE_KEY);
    if (cached) return cached;

    try {
        let data = await db.rank.findAll({
            include: [{ model: db.subject }]
        });
        const result = { EM: 'Info rank', EC: 0, DT: data };
        cache.set(CACHE_KEY, result, 15 * 60 * 1000); // cache 15 phút
        return result;
    } catch (e) {
        console.error("check error: ", e);
        return ({ EM: 'error from sever', EC: -1, DT: [] });
    }
}


const createRank = async (name) => {
    try {
        if (!name)
            return ({ EM: 'Some Field Null', EC: 2, DT: [] });

        const newRank = await db.rank.create({ name });
        cache.invalidate('ranks_all');
        return ({ EM: 'create success', EC: 0, DT: newRank });
    } catch (error) {
        console.log('chekc error', error)
        return ({ EM: 'error from sever', EC: -1, DT: [] });
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
        cache.invalidate('ranks_all');
        return ({ EM: 'update success', EC: 0, DT: updateRank });
    } catch (error) {
        return ({
            EM: 'error from sever',//error message
            EC: -1,//error code
            DT: []
        });
    }
};


const deleteRank = async (id) => {
    try {
        if (!id) return ({ EM: 'Some Field Null', EC: 2, DT: [] });

        const rank = await db.rank.findByPk(id);
        if (!rank) return ({ EM: 'Cant find by ID', EC: 1, DT: [] });

        await rank.destroy();
        cache.invalidate('ranks_all');
        return ({ EM: 'delete success', EC: 0, DT: [] });
    } catch (error) {
        console.log('deleteRank error', error);
        return ({ EM: 'error from sever', EC: -1, DT: [] });
    }
};

module.exports = {
    getRank,
    createRank,
    updateRank,
    deleteRank
}