const dotenv = require('dotenv').config();

const UserService = require('./services/UserService');
const MessageService = require('./services/MessageService');

module.exports = (http) => {

    const io = require('socket.io')(http, {
        cors: {
            origin: process.env.FRONT_CHAT,
            methods: ["GET", "POST", "PUT", "DELETE"]
        }
    });
    let messages = [];
    let users = [];

    if (messages.length === 0) {
        const messageService = new MessageService();

        messageService.get()
            .then((response) => {
                messages.push(response.data);
            })
            .catch((error) => {
                console.log("Error al recuperar datos")
            })
            .finally(() => {
                io.emit('messages', messages);
            })
    }

    io.on('connection', (socket) => {

        socket.on("new-user", (data) => {
            let user = { id: null, user: data.user, date: new Date(), socket: socket.id, status: true, messages: 0 };
            const userService = new UserService(user);

            userService.post(user)
                .then((response) => {
                    if (response.data.id > 0) {
                        user.id = response.data.id
                        users.push(user);
                    }
                })
                .catch((error) => {
                    console.log("Fallo al crear el usuario");
                })
                .finally(() => {
                    io.emit("users", users)
                });
        });

        socket.on("new-message", (data) => {

            let user = users.find(e => e.id === data.from);

            if (typeof (user) !== "undefined") {

                let newMessage = { id: null, from: data.from, message: data.message, to: data.to, date: data.date }

                if (newMessage.message !== "") {
                    const messageService = new MessageService();

                    messageService.post(newMessage)
                        .then((response) => {
                            if (response.data.id > 0) {
                                newMessage.user = user.user;
                                newMessage.id = response.data.id
                                messages.push(newMessage);
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            console.log("Falló al insertar en mensaje ")
                        })
                        .finally(() => {
                            io.emit('messages', messages);
                        })
                }
            }
        });

        socket.on('disconnect', () => {

            const userService = new UserService();

            userService.putSocket({ status: false }, socket.id)
                .then((response) => {
                    users = users.filter(e => (e.socket !== socket.id));
                    io.emit("users", users)
                })
                .catch(() => {
                    console.log('Error al actualizar el status del socket');
                })
                .finally(() => {
                    io.emit("users", users)
                });
        });

        socket.emit('users', users);
        socket.emit('messages', messages);
    });
}