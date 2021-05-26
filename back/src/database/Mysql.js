const dotenv = require('dotenv').config();
const mysql = require('mysql');

const dataConexion = { 
  host: process.env.HOST, 
  user: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const insertUser = () => {
  const con = mysql.createConnection(dataConexion);
  con.connect();

  con.query('INSERT INTO user SET ?', {user: 'pancho'})
  .then(  (error, results, fields) => {
    return results
  });

}

exports.insertUser = insertUser;