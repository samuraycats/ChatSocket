import axios from 'axios';

const API_BASE_URL = "http://localhost:3000/";

const ChatService = {
    get: () => {
        return axios.get(`${API_BASE_URL}prueba`);
    },

    postUser: (user) => {
        return axios.post(`${API_BASE_URL}user`, user);
    }
}

export default ChatService;