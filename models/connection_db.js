// DataBase
var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "PenguinRun",
    password: "1234",
    database: "ShoppingCart"
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

module.exports = con;



// function dbLoginData(data){
//   var con = mysql.createConnection({
//     host: data.host,
//     user: data.user,
//     password: data.password,
//     database: data.database
//   })
//   return con;
// }
