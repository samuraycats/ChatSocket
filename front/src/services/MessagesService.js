const MessagesService = {
    setMessages: (messagesNew, messagesOld, store) => {
        for (let i = 0; i < messagesNew.length; i++) {
            let notExist = messagesOld.some(e => (messagesNew[i].date === e.date && messagesNew[i].user === e.user));

            if (!notExist) {
                messagesNew[i].read = store.getters.getUserTalkId === messagesNew[i].from ? true : false;
                messagesOld.push(messagesNew[i]);
            }
        }

        messagesOld = messagesOld.filter((item, index) => {
            return messagesOld.indexOf(item) === index;
        });

        store.state.messages = messagesOld;
        store.dispatch("addMessagesAction");

    },

    sendMessage: (message, store, socket) => {
        let payload = {
            id: null,
            from: store.getters.getUserId,
            user: store.getters.getUserName,
            message: message,
            to: store.getters.getUserTalkId !== null ? store.getters.getUserTalkId : 0,
            date: new Date(),
            read: false,
        };

        socket.emit("new-message", payload);
    },
}


export default MessagesService;