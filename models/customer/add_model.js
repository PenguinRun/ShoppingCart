var db = require('../connection_db');
var CheckCustomer = require('../../service/customer_check');

module.exports = class CustomerAddModel {
  customerAdd(customerList) {
    var checkCustomer = new CheckCustomer();
    var result = {};
    return new Promise((resolve, reject) => {
      db.query('SELECT Email FROM customer WHERE Email = ?', customerList.Email, function(err, rows) {
        console.log(rows.length);
        if (rows.length >= 1){
          result.err = "已有重複的Email。";
          resolve(result);
        }else{
          db.query('INSERT INTO customer SET ?', customerList, function(err, rows) {
            if (err) {
              return console.log(err);
            }
            result.addData = customerList;
            resolve(result);
          })
        }
      })
    })
  }
}
