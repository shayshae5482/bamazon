var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "bootcamp",
  database: "bamazon"
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryAllIds();
  //queryAllProducts();
});

//Prompt the user on how they want to search for products

function start(data) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "Enter the product id",
      },

      {
        type: "input",
        name: "units",
        message: "How many would you like?"
      }
    
      

    ])
.then(function(answer) {

  var quantity;
  for (var i =0; i < data.length; i++) {
if (data[i].item_id==answer.id) {
  quantity = data[i].stock_quantity;
}

  }

if (answer.units > quantity) {
  console.log("Insufficient quantity. Try again.");

  return start(data);
}
connection.query(
  "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
  [
{
  stock_quantity: answer.units
},

{
  item_id: answer.id
}

  ]
)
}

)
}  




function queryAllIds() {
        connection.query("SELECT * FROM products", function (err, res) {
          for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
          }
          console.log("-----------------------------------");
          start (res)
        });
      }
  
  function queryAllProducts() {
        var query = connection.query("SELECT * FROM products WHERE kind=?", ["product_name"], function (err, res) {
          console.log(res);
          //    for (var i = 0; i < res.length; i++) {
          //     console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
          //   }
        });

        //logs the actual query being run
        console.log(query.sql);
      }