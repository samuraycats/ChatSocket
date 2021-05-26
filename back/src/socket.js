module.exports = (http) => {
    const io = require('socket.io')(http, {
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    let messages = [];

    io.on('connection', (socket) => {
        socket.on("new-message", function (data) {
            messages.push(data);
            io.emit("messages", messages);
        });

        socket.emit('messages', messages);
    });
}