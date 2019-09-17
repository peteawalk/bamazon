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

var displayAll = function() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM items", function (err, res) {
        if (err) throw err;
        var newline = ("\n========================================")
        for (var i = 0; i < res.length; i++) {
            console.log(` ID: ${res[i].item_id} \n Product: ${res[i].product_name} \n Price: ${res[i].price} \n ${res[i].stock_quantity} ${newline}`)
        };
        buyEverything();
    });
}

var buyEverything = function() {
    inquirer
        .prompt({
            name: "item",
            type: "number",
            message: "What would you like to look buy? (Enter ID or ctrl + C to quit)"
        })
        .then(function (answer) {
            connection.query("SELECT * FROM items WHERE item_id = ?", [answer.item],
                function (err, res) {
                    if (err) throw err;
                        var product = res[0].product_name;
                        var product_available = res[0].stock_quantity;
                        var price = res[0].price;
                        
                        if (res[0].item_id === answer.item) {

                            inquirer.prompt({
                                name: "quantity",
                                type: "number",
                                message: "How many would you like?",
                                validate: function(value){
                                    if((value) >= 1){
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }).then(function(answer){

                                var determineQuantity = (product_available - answer.quantity);
                                if ( determineQuantity > 0 ){
                                    connection.query("UPDATE items SET stock_quantity = ? WHERE product_name = ?", [determineQuantity, product], function(err, res) {
                                        if (err) throw err;
                                        var newline = ("\n========================================")
                                        console.log(`Your total is $${answer.quantity * price} ${newline} \n Purchase complete! Thanks! ${newline}`);
                                        displayAll();
                                    });
                                } else {
                                    console.log("Not a valid choice!");
                                    buyEverything();
                                }
                            })
                        };
                    })
    })
}