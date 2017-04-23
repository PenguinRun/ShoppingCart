var db = require('../connection_db');

module.exports = class OrderDataModel {
  orderData(ID) {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM orderList WHERE CustomerID = ?', ID, function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        result = rows;
        if (rows[0] === undefined) {
          result = "沒有任何訂單的資料！"
          reject(result);
          return;
        }
        resolve(rows);
      })
    })
  }
}
