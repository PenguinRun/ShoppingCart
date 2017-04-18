// DataBase
var config = require('../config/development');
var mysqlt = require("mysql");

var con = mysqlt.createConnection({
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        res.json({
          err: "伺服器錯誤，請稍後在試！"
        })
        return;
    }
    console.log('connecting success');
});

module.exports = con;
