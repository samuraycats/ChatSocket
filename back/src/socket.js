const dotenv = require('dotenv').config();
const mysql = require('mysql');

module.exports = (http) => {
    const io = require('socket.io')(http, {
        cors: {
            origin: process.env.FRONT_CHAT,
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });

    const dataBaseConexion = {
        host: process.env.HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE
    };

    let messages = [];
    let users = [];

    io.on('connection', (socket) => {

        socket.on("new-user", (data) => {
            const con = mysql.createConnection(dataBaseConexion)
            con.connect();

            let user = { id: null, user: data.user, date: new Date(), socket: socket.id, status: true, messages: 0 };

            con.query('INSERT INTO user SET ?', { user: user.user, date: user.date, socket: socket.id, status: true }, (error, results, fields) => {
                if (error) throw err;
                user.id = results.insertId;
                con.end();

                users.push(user);
                io.emit("users", users)
            });
        });

        socket.on("new-message", function (data) {
            const con = mysql.createConnection(dataBaseConexion)
            con.connect();
            let newMessage = {id: data.id, from:data.from, message:data.message, to:data.to, date:data.date}
        
            if (newMessage.message !== ""){
                con.query('INSERT INTO message SET ?', newMessage, (error, results, fields) => {
                    data.id = results.insertId;
                    con.end();
    
                    messages.push(data);
                    io.emit('messages', messages);
                });
            } 
        });

        socket.on('disconnect', function () {
            const con = mysql.createConnection(dataBaseConexion)
            con.connect();

            con.query('UPDATE user SET status = false WHERE socket = ? ', [socket.id], (error, result) => {
                users = users.filter(e => (e.socket !== socket.id));
                io.emit("users", users)
            });

            console.log('has disconnected from the chat.');
        });

        socket.emit('users', users);
        socket.emit('messages', messages);
    });
}