var db = require('../connection_db');

module.exports = class ProductAddModel {
  productAdd(productList) {
    var result = {};
    return new Promise((resolve, reject) => {
      db.query('INSERT INTO product SET ?', productList, function(err, rows) {
        if (err) {
          console.log(err);
          result.err = "伺服器錯誤，請稍後在試！"
          reject(result);
          return;
        }
        result.addData = productList;
        resolve(result);
      })
    })
  }
}
