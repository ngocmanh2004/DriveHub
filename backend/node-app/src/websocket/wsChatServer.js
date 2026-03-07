import { WebSocketServer } from 'ws';

function setupChatWebSocket(server, path) {
    const wss = new WebSocketServer({ server, path });

    wss.on('connection', (ws) => {
        console.log('Client connected to Chat WebSocket');

        ws.on('message', (message) => {
            // Xử lý tin nhắn chat
            console.log(`Received message: ${message}`);
            // Gửi lại tin nhắn tới tất cả các client
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(`Chat message: ${message}`);
                }
            });
        });

        ws.on('close', () => {
            console.log('Client disconnected from Chat WebSocket');
        });
    });
}

export default setupChatWebSocket;
