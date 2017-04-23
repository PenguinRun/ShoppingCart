var db = require('../connection_db');

//取得全部商品資料

module.exports = class ProductListData {
  getProductListData() {
    var result = "";
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM product', function(err, rows) {
        if (err) {
          console.log(err);
          result = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        resolve(rows)
      })
    })
  }
}
