'use strict';
const mysql = require('mysql2');
//local mysql db connection
const dbConn = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password : '10IhCcjt4204111997',
    database : 'moviestore'
});
dbConn.connect((err) =>{
    if (err){
        console.log(err);
    } 
    console.log("Database Connected!");

});

module.exports = dbConn;