const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const socket = require(`${process.env.SRC}socket`);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let whiteList = [{url:process.env.FRONT_ENDPOINT, status:true}];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some( e => e.url === origin && e.status === true )) {
      console.log("ok");
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }

  }
}

app.get("/prueba", cors(corsOptions), (req, resp, next) => {
  resp.send({ id: 0, nombre: "Lorenzo" })
});

app.post("/user", cors(corsOptions), (req, resp, next) => {
  console.clear();
  console.log(req.body.user);

  resp.send({ req: "" })
});

const http = require("http").createServer(app);
socket(http);

module.exports = http;