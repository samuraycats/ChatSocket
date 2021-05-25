const { Socket } = require('socket.io');

module.exports= (http) => {
    const io =require('socket.io')(http);
    console.log('user connected');

    io.on('connection', (socket) => {

        socket.on("chat-message", (msg)=> {
            io.emit('chat-message', msg);
        });

        socket.on("disconnect", (msg)=> {
            io.emit('User disconnect', msg);
        });

    });
}