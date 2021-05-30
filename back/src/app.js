const dotenv = require('dotenv').config();
const express = require('express');
const router = require('express').Router();
const cors = require('cors');
const mysql = require('mysql');
const socket = require(`${process.env.SRC}socket`);
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

let whiteList = process.env.FRONT_ENDPOINT
whiteList = whiteList.split(",");

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin !== -1)) {
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

app.post("/api/message", cors(corsOptions), (req, resp, next) => {

  let newMessage = {
    id: null,
    from: req.body.from,
    message: req.body.message,
    to: req.body.to,
    date: req.body.date
  }

  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('INSERT INTO message SET ?', newMessage, (error, results, fields) => {
    newMessage.id = results.insertId;
    con.end();
    resp.send(newMessage)
  });
});

app.get("/api/message", cors(corsOptions), (req, resp) => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('SELECT * FROM message', (error, rows) => {
    if (error) throw err;
    con.end();
    resp.send(rows)
  });
});

app.get("/api/message/:id", cors(corsOptions), (req, resp) => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('SELECT * FROM message where id = ?', [req.params.id], (error, rows) => {
    con.end();
    resp.send(rows.length === 0 ? null : rows[0]);

  });
});

app.put('/api/message/:id', cors(corsOptions), (req, resp) => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  let updateMessage = {
    from: req.body.from ? req.body.from : null,
    message: req.body.message ? req.body.message : null,
    to: req.body.to ? req.body.to : null,
    date: req.body.date ? req.body.date : null
  }

  con.query('SELECT * FROM message where id = ?', [req.params.id], (error, rows) => {
    if (rows.length !== 0) {
      updateMessage.from = (updateMessage.from === null ? rows[0].from : updateMessage.from);
      updateMessage.message = (updateMessage.message === null ? rows[0].message : updateMessage.message);
      updateMessage.to = (updateMessage.to === null ? rows[0].to : updateMessage.to);
      updateMessage.date = (updateMessage.date === null ? rows[0].to : updateMessage.date);

      let update = `date='${updateMessage.date}', message='${updateMessage.message}', \`from\`= ${updateMessage.from}, \`to\`='${updateMessage.to}'`

      con.query(`UPDATE message SET ${update} where id = ?`, [req.params.id], (error, result) => {
        con.end();
        resp.send(updateMessage)
      });
    } else {
      con.end();
      resp.send({ error: "No se encontró el registro" });
    }
  });



});

app.delete('/api/message/:id', cors(corsOptions), (req, resp) => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query(`DELETE FROM message WHERE id = ? `, [req.params.id], (error, result) => {
    con.end();
    resp.send({ status: result.affectedRows === 1 ? true : false })
  });
});
 // ============== users ============

app.post("/api/user", cors(corsOptions), (req, resp) => {
  let newUser = {
    id: null,
    user: req.body.user,
    date: req.body.date,
    socket: req.body.socket,
    status: req.body.status ? req.body.status : true,
    messages: req.body.messages ? req.body.messages : 0
  };

  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('INSERT INTO user SET ?', newUser, (error, results, fields) => {
    newUser.id = results.insertId;
    con.end();
    resp.send(newUser)
  });
});

app.put('/api/user/socket/:name', cors(corsOptions), (req, resp) => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  let updateUser = {
    status: req.body.status ? req.body.status :  false 
  }

  con.query('SELECT * FROM user where socket = ?', [req.params.name], (error, rows) => {
    if (rows.length !== 0) {
      updateUser.user = (updateUser.user === null ? rows[0].user : updateUser.user);

      let update = `status=${updateUser.status}`

      con.query(`UPDATE user SET ${update} where socket= ?`, [req.params.name], (error, result) => {
        con.end();
        resp.send(updateUser)
      });

    } else {
      con.end();
      resp.send({ error: "No se encontró el registro del user" });
    }
  });
});

const http = require("http").createServer(app);
socket(http);

module.exports = http;