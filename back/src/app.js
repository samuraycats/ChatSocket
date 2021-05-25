const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');

const socket = require(`${process.env.SRC}socket`);

const app = express();

const corsOptions = {
    origin: process.env.FRONT_ENDPOINT,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

app.use(cors());


app.get("/", cors(corsOptions), (rep, resp, next) => {
    resp.send({ id: 0, nombre: "Lorenzo" })
});

const http = require("http").createServer(app);
socket(http);

module.exports = http;