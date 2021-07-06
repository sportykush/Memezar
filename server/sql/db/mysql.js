const mysql = require('mysql2');
require('dotenv').config();

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.SQL_DB_PASS,
    database: 'memeuser'
});

module.exports= mysqlConnection;