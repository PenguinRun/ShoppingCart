var db = require('../connection_db');

//取得全部顧客資料

module.exports = class CustomerListData {
  getCustomerListData() {
    var result ="";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM customer', function(err, rows) {
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
