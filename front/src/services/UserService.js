const UserService = {

    saveUsers: (users, store) => {
        store.state.users = users;
        store.dispatch("addUsersAction");
    },

    countMessages: (messages, store) => {
        let users = [];

        for (const user of store.getters.getUsers) {
            let messagesForUser = messages.filter(e => (e.from === user.id && e.to == store.getters.getUserId && e.read === false));
            users.push({
                ...user,
                messages: messagesForUser.length
            });
        }

        store.state.users = users;
        store.dispatch("addUsersAction");
    },

    cleanMessage: (user, store) => {
        let users = store.getters.getUsers;
        let messages = JSON.parse(store.getters.getMessages);

        messages = messages.filter(e => (e.from === user.id && e.to == store.getters.getUserId && e.read === false));

        if (messages.length > 0) {

            messages = messages.filter(e => {
                e.read = true;
                return e;
            });

            users = users.filter(e => {
                if (e.id === user.id) {
                    e.messages = 0
                }
                return e;
            });


            messages = messages.filter((item,index)=>{
                return messages.indexOf(item) === index;
            });

            store.state.messages = messages
            store.dispatch("addMessagesAction");

            store.users = users;
            store.dispatch("addUsersAction");
        }
    },
}


export default UserService;