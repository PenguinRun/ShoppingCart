var db = require('../connection_db');

module.exports = class OrderListModel {
  getOrderListData(){
    var result ="";
    return new Promise((resolve, reject) => {
      db.query('SELECT * from orderList', function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        resolve(rows);
      })
    })
  }
}
