import rankService from "../service/rankService.js";

const getRank = async (req, res) => {
    try {
        const data = await rankService.getRank();
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


const createRank = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await rankService.createRank(name);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.log('chekc error', error)
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: '-1',//error code
            DT: ''
        });
    }
};

const updateRank = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const data = await rankService.updateRank(id, name);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: '-1',//error code
            DT: ''
        });
    }
};


const deleteRank = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await rankService.deleteRank(id);
        return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
    } catch (error) {
        return res.status(500).json({ EM: 'error from sever', EC: '-1', DT: '' });
    }
};

module.exports = {
    getRank,
    createRank,
    updateRank,
    deleteRank
}