var db = require('../connection_db');

module.exports = class OrderListModel {
  getOrderListData(){
    return new Promise((resolve, reject) => {
      db.query('SELECT * from orderList', function(err, rows) {
        if (err) {
          reject(err);
        }
        resolve(rows);
      })
    })
  }
}
