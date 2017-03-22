var db = require('../connection_db');

module.exports = class OrderDataModel{
  orderData(orderID){
    return new Promise((resolve, reject) => {
      db.query('SELECT * from orderList where OrderID = ?', orderID, function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}
