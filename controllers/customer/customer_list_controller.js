var express = require('express');
var router = express.Router();

var CustomerListData = require('../../models/customer/customer_list_model');

//備份資料庫
// mysqldump -u PenguinRun -p"1234" ShoppingCart > dept.sql

//新增權限
// INSERT INTO user(host, user, password VALUES('%', 'username', password('PWD'));
// GRANT ALL ON *.* TO 'username'@localhost IDENTIFIED BY 'PWD' WITH GRANT OPTION;
// FLUSH PRIVILEGES;

module.exports = class CustomerList{
  getCustomerData(req, res ,next){
    var customerListData = new CustomerListData();
    customerListData.getCustomerListData().then(
      function(rows){
        res.json({
          result: rows
        })
      }
    )
  }
}
