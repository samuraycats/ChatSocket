const axios = require('axios');

module.exports = function (){

    this.post = function(message){
        return axios.post(`${process.env.BACK_ENDPOINT}/message`, message);
    }

    this.get = function(){
        return axios.get(`${process.env.BACK_ENDPOINT}/message`);
    }

}