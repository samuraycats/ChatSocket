const axios = require('axios');

module.exports = function (){

    this.get = () => {
        return axios.get(`${process.env.BACK_ENDPOINT}`);
    }

    this.post = function(user){
        return axios.post(`${process.env.BACK_ENDPOINT}/user`, user);
    }

    this.putSocket = function(user, socket){
        return axios.put(`${process.env.BACK_ENDPOINT}/user/socket/${socket}`, user);
    }
    

}
