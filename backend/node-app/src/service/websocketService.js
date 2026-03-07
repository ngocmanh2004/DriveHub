import { sendStatusUpdate } from './websocket/wsStudentStatusServer.js';

// Example usage
async function updateUserStatus(userId, newStatus) {
    // Assume we update the user's status in the database here
    await db.khoahoc_thisinh.update(
        { IDstatus: newStatus },
        { where: { IDThiSinh: userId } }
    );

    // After updating in the database, broadcast the new status via WebSocket
    sendStatusUpdate(userId, newStatus);
}

module.exports = {
    updateUserStatus
}