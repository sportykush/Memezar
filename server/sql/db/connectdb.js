// const mysql = require('mysql2');
const mysqlConnection = require('./mysql');

mysqlConnection.connect((err) => {
    if(!err) {
        console.log("Connected to the MySQL database!");
    }
    else {
        console.log("Cannot connect to the database!", err);
    }
});