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
  } else {
    console.log('connecting success');
  }
});

module.exports = con;
