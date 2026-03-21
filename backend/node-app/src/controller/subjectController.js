import subjectService from "../service/subjectService.js";

const getSubject = async (req, res) => {
    try {
        const { rankId } = req.params;
        const { showsubject } = req.query; // Truyền qua query string
        const data = await subjectService.getSubject(rankId, showsubject);
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

const createSubject = async (req, res) => {
    try {
        const { name, rankId, threshold, nameEx, numberofquestion, showsubject, timeFinish } = req.body;
        const data = await subjectService.createSubject(name, rankId, threshold, nameEx, numberofquestion, showsubject, timeFinish);
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

const updateSubject = async (req, res) => {
    try {
        const { IDsubject } = req.params;
        const { rankId, name, threshold, nameEx, showsubject, timeFinish } = req.body;
        console.log('check IDsubject, rankId, name, threshold, nameEx, showsubject, timeFinish', IDsubject, rankId, name, threshold, nameEx, showsubject, timeFinish)
        const data = await subjectService.updateSubject(IDsubject, rankId, name, threshold, nameEx, showsubject, timeFinish);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.log('check err', error)
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: '-1',//error code
            DT: ''
        });
    }
};

const getTestFromSubject = async (req, res) => {
    try {
        const { IDSubject } = req.params; // Truyền qua query string
        const data = await subjectService.getTestFromSubject(IDSubject);
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

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await subjectService.deleteSubject(id);
        return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });
    } catch (error) {
        return res.status(500).json({ EM: 'error from sever', EC: '-1', DT: '' });
    }
};

module.exports = {
    getSubject,
    createSubject,
    updateSubject,
    deleteSubject,
    getTestFromSubject
}