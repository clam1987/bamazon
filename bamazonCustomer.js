//Dependancies
var inquirer = require('inquirer')
var mysql = require('mysql')
const products = "SELECT * FROM products";
var emptyArr = [];
var qty;
var answers;

console.log("Welcome To Bamazon! Your one stop place to shop for thing's that are important to you!");


//Connection to the server certifactions
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'clam',
    password: 'root',
    database: 'bamazon_DB'
});

//Connection Confirmation
connection.connect(function(err){
    if (err) throw err;
    console.log("You've connected as id " + connection.threadId + "\n");
    displayInv();
}); 

console.log("Here is what we still have available");

//Display the inventory
function displayInv() {
connection.query(products, function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            emptyArr.push(res[i].item_id);
            // console.log(res)
            // console.log(res[i]);
            console.log(res[i].item_id,res[i].product_name, res[i].price);
        }
        customBuy();
        // console.log(`${res[1].product_name}\n${res[2].product_name}\n`);
        
    
})
};

//Prompt to ask the customer to buy
function customBuy() {
            // console.log(emptyArr);
    inquirer
    .prompt([
        {
            type: "list",
            name: "customer",
            message: "What item would you like to buy?",
            choices: emptyArr
        },
        {
            type: "input",
            name: "qty",
            message: "How many do you want to buy?"
        }
    ]).then(function(response) {
        answers = response.customer;
        qty = response.qty;
        // console.log(response);
        console.log(`You have chosen ${response.customer} and you want to buy ${response.qty}`)
        // checkInventory();
    }); 
};


function checkInventory() {
    connection.query(`SELECT * FROM products WHERE product_name = ${answers}`, function(err,res) {
        console.log(res)
        if (err) throw err;
        
    //     if (res.stock_qty < response.qty) {
    //         console.log("Sorry we've sold out of this item");
    //     } else {
    //         // updateProduct();
    //         console.log("Congratulations, You've bought the item!")
    //     }
    })
};

// function updateProduct() {
//     console.log("Updating the qty's");
//     var query = connection.query("UPDATE products SET ? WHERE ?"
//     [
//         {
//             stock_qty: res[0].stock_qty - answers.qty
//         },
//         {
//             item_id: answers.id
//         }
//     ],
//     function(err, res) {
//         console.log(`${res.affectedRows} products updated!`);
//     })
// };

