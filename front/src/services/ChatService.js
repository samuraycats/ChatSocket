import axios from 'axios';

const GENERAL = 0;

const ChatService = {
    get: () => {
        return axios.get(`${process.env.VUE_APP_BACK_END_POINT}prueba`);
    },

    postUser: (user) => {
        return axios.post(`${process.env.VUE_APP_BACK_END_POINT}user`, user);
    },


    filterMessages: (messages, store) => {
        let filterMessages = [];

        if (store.getters.getUserTalkId === GENERAL) {
            filterMessages = messages.filter(e => (e.to === 0));
        } else {
            filterMessages = messages.filter(e => (
                (e.from === store.getters.getUserId && e.to === store.getters.getUserTalkId) ||
                (e.to === store.getters.getUserId && e.from === store.getters.getUserTalkId)));
        }

        return filterMessages;
    }

}

export default ChatService;