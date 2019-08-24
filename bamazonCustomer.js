var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    database: "bamazon_db",
    user: "root",
    password: "password"
});

connection.connect(function (err) {
    if (err) throw err;
    displayAll();
});

function displayAll() {
    connection.query("SELECT item_id, product_name, price FROM items", function (err, res) {
        if (err) throw err;
        var newline = ("\n\n========================================\n")
        for (var i = 0; i < res.length; i++) {
            console.log(` ID: ${res[i].item_id} \n Product: ${res[i].product_name} \n Price: $${res[i].price} ${newline}`)
        };
        connection.end(); // REPLACE with next inquirer function!!!
    });
}

function buyEverything() {
    inquirer
        .prompt({
            name: "purchase",
            type: "input",
            message: "What would you like to look buy?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        })
        .then(function (answer) {
            console.log(answer.song);
            connection.query("SELECT * FROM items WHERE ?", {
                product_name: answer.purchase
            }, function (err, res) {
                console.log();
                // Calculate cost!
            });
        });
}