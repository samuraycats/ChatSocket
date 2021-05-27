
const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const socket = require(`${process.env.SRC}socket`);
const app = express();


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let whiteList = [{url:process.env.FRONT_ENDPOINT, status:true}];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.some( e => e.url === origin && e.status === true )) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const dataConexion = { 
  host: process.env.HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};


app.get("/prueba", cors(corsOptions), (req, resp, next) => {
  resp.send({ id: 0, nombre: "Lorenzo" })
});

app.post("/user", cors(corsOptions), (req, resp, next) => {
  let response = {id:null, user:null, status:true };

  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('SELECT * FROM user where user = ?', [req.body.user], (error, rows) => {
    if (rows.length === 0 ) {      
      con.query('INSERT INTO user SET ?', {user: req.body.user}, (error, results, fields) => {
        response.id = results.insertId;
        response.user= req.body.user;
        con.end();
        resp.send(response)
      });

    } else {
      response.id = rows[rows.length -1].id;
      response.user= rows[rows.length -1].user;
      con.end();
      resp.send(response)
    }
  });
  
  
  
});

const http = require("http").createServer(app);
socket(http);

module.exports = http;
