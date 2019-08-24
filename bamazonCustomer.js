var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "topsongs_db",
    user: "root",
    password: "password"
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});