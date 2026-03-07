import examService from "../service/examService.js"
import { update } from 'lodash';

const getSubject = async (req, res) => {
    try {
        const { rankId } = req.params;
        const { showsubject } = req.query; // Truyền qua query string
        const data = await examService.getSubject(rankId, showsubject);
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

const createExam = async (req, res) => {
    try {
        const { IDThisinh, IDTest, answerlist, point, result, IDSubject } = req.body;
        const data = await examService.createExam(IDThisinh, IDTest, answerlist, point, result, IDSubject);
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

const deleteExam = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await examService.deleteExam(id);
        return res.status(200).json({
            EM: data.EM,//error message
            EC: data.EC,//error code
            DT: data.DT
        });
    } catch (error) {
        console.log('check error', error)
        return res.status(500).json({
            EM: 'error from sever',//error message
            EC: '-1',//error code
            DT: ''
        });
    }
};

const exportReport = async (req, res) => {
    try {
        const { courseId } = req.query;
        console.log('check courseId', courseId)
        const data = await examService.exportReport(courseId);
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
    createExam,
    deleteExam,
    exportReport
}