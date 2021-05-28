import axios from 'axios';


const ChatService = {
    get: () => {
        return axios.get(`${process.env.VUE_APP_BACK_END_POINT}prueba`);
    },

    postUser: (user) => {
        return axios.post(`${process.env.VUE_APP_BACK_END_POINT}user`, user);
    }
}

export default ChatService;