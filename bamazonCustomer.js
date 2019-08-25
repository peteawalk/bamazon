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
        buyEverything();
    });
}

function buyEverything() {
    inquirer
        .prompt({
            name: "item",
            type: "input",
            message: "What would you like to look buy?"
        }, {
            name: "quantity",
            type: "input",
            message: "How many would you like?"
        })
        .then(function (answer) {
            connection.query("SELECT item_id and price FROM items WHERE item_id = ?", [answer.item],
                function (err, res) {
                    if (err) throw err;
                    if (answer.quantity > res.quantity) {
                        console.log(`\nWe do not have enough available, please choose a different quantity.`)
                    } else {
                        console.log(`\nOrder confirmed! Shipping information will be sent soon.`)
                        connection.query("UPDATE items SET stock_quantity = stock_quantity - ? WHERE item_id = ? ", [answer.quantity, answer.item],
                            function (err) {
                                if (err) throw err;
                                console.log(`\n Thanks for your business! \nYour total is $ ${answer.order} * ${answer.price}`);
                            }
                        )
                    }
                })
            displayAll(); // Display count and user can purchase more...
        });
}