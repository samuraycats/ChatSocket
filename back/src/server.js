
const dotenv = require('dotenv').config();
const http = require(`${process.env.SRC}app`);
const port = process.env.BACK_PORT;

http.listen( port, () => {
    console.info(`server run port ${port}` );
});

/*
const dotenv = require('dotenv').config();
const http = require(`${process.env.SRC}app`);
const port = process.env.BACK_PORT;

http.listen( port, () => {
    console.info(`server run port ${port}` );
});
*/