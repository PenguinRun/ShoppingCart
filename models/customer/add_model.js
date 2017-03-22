var db = require('../connection_db');

module.exports = class CustomerAddModel {
  customerAdd(customerList) {
    var result = {};
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO Customer SET ?', customerList, function(err, rows) {
        if (err) {
          return console.log(err);
        }
        result.addData = customerList;
        resolve(result);
      });
    })
  }
}
